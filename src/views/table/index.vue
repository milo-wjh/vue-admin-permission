<template>
  <div class="app-container">
    <div class="search-box">
      <el-input style="width: 200px;" v-model="listQuery.title" placeholder="标题" ng-class="el-input__inner"></el-input>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>

      <el-table-column label="Author" width="110" align="center">
        <template scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.timestamp | setTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-contain">
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.page"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="listQuery.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getList } from '@/api/table';
  import { parseTime, test } from '@/utils';

  export default {
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        }
      }
    },
    created() {
      this.fetchData();
    },
    filters: {
      setTime: function(value, type) {
        return parseTime(value, type);
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getList(this.listQuery).then(response => {
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        })
      },
      handleSizeChange(size) {
        this.listQuery.limit = size;
        this.fetchData();
      },
      handleCurrentChange(index) {
        this.listQuery.page = index;
        this.fetchData();
      }
    }
  };
</script>
<style scoped>
  .pagination-contain {
    margin-top: 30px;
  }
</style>