<template>
  <div>
    <el-table
      :data="payList"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
      show-summary
      :summary-method="getSummary"
    >
      <el-table-column prop="id" label="id" width="180" v-if="false" align="center"></el-table-column>
      <el-table-column
        prop="payTime"
        label="支付时间"
        width="180"
        :formatter="dateFormat"
        align="center"
      ></el-table-column>
      <el-table-column prop="payType" label="消费类型" width="180" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.payType == 0">菜</span>
          <span v-if="scope.row.payType == 1">水果</span>
          <span v-if="scope.row.payType == 2">零食</span>
          <span v-if="scope.row.payType == 3">饮品</span>
          <span v-if="scope.row.payType == 4">外卖</span>
          <span v-if="scope.row.payType == 5">出行</span>
          <span v-if="scope.row.payType == 6">服饰</span>
          <span v-if="scope.row.payType == 7">化妆品</span>
          <span v-if="scope.row.payType == 8">洗护</span>
          <span v-if="scope.row.payType == 9">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="payName" label="消费人" align="center"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="payAmount" label="消费金额" align="center" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editRecord(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRecord(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right; margin-top: 10px"
      ></el-pagination>
    </div>

    <el-dialog title="修改记录" :visible.sync="dialogFormVisible">
      <el-form :model="paymentDetail">
        <el-form-item label="支付时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="paymentDetail.payTime"
            align="right"
            type="date"
            placeholder="选择支付时间"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="消费类型" :label-width="formLabelWidth">
          <el-select v-model="paymentDetail.payType" placeholder="请选择消费类型">
            <el-option label="菜" :value="0"></el-option>
            <el-option label="水果" :value="1"></el-option>
            <el-option label="零食" :value="2"></el-option>
            <el-option label="饮品" :value="3"></el-option>
            <el-option label="外卖" :value="4"></el-option>
            <el-option label="出行" :value="5"></el-option>
            <el-option label="服饰" :value="6"></el-option>
            <el-option label="化妆品" :value="7"></el-option>
            <el-option label="洗护" :value="8"></el-option>
            <el-option label="其他" :value="9"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="paymentDetail.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="消费金额" :label-width="formLabelWidth">
          <el-input v-model="paymentDetail.payAmount" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-table .canyin-row {
  background: rgb(197, 178, 9);
}

.el-table .gouwu-row {
  background: #cf3610;
}
.el-table .jiaotong-row {
  background: #06ac46;
}

.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 70px;
  line-height: 70px;
}
.el-table__body tr,
.el-table__body td {
  padding: 0;
  height: 40px;
  line-height: 40px;
}
.el-input {
  width: 250px;
}
</style>

<script>
import payListApi from "../api/payList";

export default {
  data() {
    return {
      payList: [],
      total: 0,
      currentPage: 1,
      pageSize: 15,
      dialogFormVisible: false,
      paymentDetail: {
        id: "",
        payTime: "",
        payType: "",
        remark: "",
        payAmount: "",
      },
      formLabelWidth: "300px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // if (row.payType === 1) {
      //   return "canyin-row";
      // } else if (row.payType === 2) {
      //   return "gouwu-row";
      // } else if (row.payType === 3) {
      //   return "jiaotong-row";
      // }
      // return "";
    },
    getPayList(pageNo, pageSize) {
      payListApi.payList(pageNo, pageSize).then((res) => {
        this.payList = res.data;
        this.total = res.total;
      });
    },
    deleteRecord(row) {
      this.$confirm("确定删除记录吗?", "操作确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          payListApi.deleteById(row.id).then((res) => {
            console.log("res", res);
            if (res.code == 1) {
              this.getPayList(this.currentPage, this.pageSize);
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editRecord(row) {
      this.dialogFormVisible = true;
      this.paymentDetail.id = row.id;
      this.paymentDetail.payName = row.payName;
      this.paymentDetail.payTime = row.payTime;
      this.paymentDetail.payType = row.payType;
      this.paymentDetail.remark = row.remark;
      this.paymentDetail.payAmount = row.payAmount;
    },
    saveEdit(formName) {
      let formData = JSON.stringify(this.paymentDetail);
      payListApi.editById(formData).then((res) => {
        if (res.code == 1) {
           this.dialogFormVisible = false;
          this.getPayList(this.currentPage, this.pageSize);
          this.$message({
            type: "success",
            message: "修改成功",
          });
        }
      });
    },
    dateFormat(row, column) {
      var t = new Date(row.payTime);
      var month =
        t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1;
      var day = t.getDate() < 10 ? "0" + (t.getDate() + 1) : t.getMonth() + 1;
      return t.getFullYear() + "-" + month + "-" + day;
    },
    getSummary(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);

          sums[index] += " 元";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    handleSizeChange(val) {
      this.getPayList(this.currentPage, val);
    },
    handleCurrentChange(val) {
      this.getPayList(val, this.pageSize);
    },
  },
  created() {
    this.getPayList(this.currentPage, this.pageSize);
  },
};
</script>