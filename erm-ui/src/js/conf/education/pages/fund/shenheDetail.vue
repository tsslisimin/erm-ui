<template>
  <div class="wrapper">
    <Location>资助管理 > 审核名单查看</Location>
    <div class="con">
      <Card :padding="10">
        <div class="do-some clearfix">
          <div class="f-fl">
            <!--<Button type="primary" @click="agreeMore()">批量同意</Button>&nbsp;-->
            <!--<Button type="primary" @click="rejectMore()">批量拒绝</Button>-->
          </div>
        </div>

        <v-table v-if="listData.length" :items="listData" :header="[]">
          <template slot="t-header">

            <th class="center"><p sort-key="schoolId"><span>姓名</span><span class="sort"><i
              class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="schoolId"><span>身份证号</span><span class="sort"><i
              class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="typeName"><span>性别</span><span class="sort"><i
              class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="name"><span>年龄</span><span class="sort"><i
              class="iconfont up">&#xe6f4;</i><i class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>学号</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>学校名称</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>年级</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>班级</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>学段</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>困难等级</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>
            <th class="center"><p sort-key="statusName"><span>智能得分</span><span class="sort"><i class="iconfont up">&#xe6f4;</i><i
              class="iconfont down">&#xe608;</i></span></p></th>

          </template>
          <template slot="t-body" slot-scope="props">
            <tr>
              <td class="center">{{props.data.name}}</td>
              <td class="center">{{props.data.idcard}}</td>
              <td class="center">{{props.data.gender}}</td>
              <td class="center">{{props.data.age}}</td>
              <td class="center">{{props.data.stuno}}</td>
              <td class="center">{{props.data.school}}</td>
              <td class="center">{{props.data.clazz}}</td>
              <td class="center">{{props.data.grade}}</td>
              <td class="center">{{props.data.zone}}</td>
              <td class="center">{{props.data.diffLevelName}}</td>
              <td class="center">{{props.data.score}}</td>
            </tr>
          </template>
        </v-table>

        <div class="page clearfix" v-if="total > 10">
          <div class="f-fr">
            <Page :total="total" show-total @on-change="pageChange"></Page>
          </div>
        </div>

        <Nodata v-if="!listData.length"></Nodata>

        <!-- <div class="edit">
          <Modal v-model="agreeModal" title="同意" :ok-text="'同意'" @on-ok="agreeInfo" @on-cancel="agreeModal = false">
            <div class="edit-con">
              <Form ref="agreeEdit" :model="agreeEdit" :label-width="80" style="padding-top: 15px;">
                <FormItem label="审核意见" style="margin-bottom: 20px;">
                  <Input v-model="agreeEdit.content" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请输入..." style="width: 350px;"></Input>
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div> -->

        <div class="edit">
          <Modal v-model="rejectModal" title="拒绝" :ok-text="'拒绝'" @on-ok="rejectInfo" @on-cancel="rejectModal = false">
            <div class="edit-con">
              <Form ref="rejectEdit" :model="rejectEdit" :label-width="80" style="padding-top: 15px;">
                <FormItem label="审核意见" style="margin-bottom: 20px;">
                  <Input v-model="rejectEdit.content" type="textarea" :autosize="{minRows: 5,maxRows: 20}"
                         placeholder="请输入..." style="width: 350px;"></Input>
                </FormItem>
              </Form>
            </div>
          </Modal>
        </div>

      </Card>
    </div>
  </div>
</template>

<script>
  import Location from 'js/module/components/location/location'
  import io from 'js/module/api/io'
  import {api} from 'js/module/api/url'
  import vTable from 'js/module/components/table/table'
  import _ from 'lodash'
  import $ from 'jquery'
  import Nodata from 'js/module/components/nodata/nodata'

  export default {
    name: 'manageShenhe',
    data() {
      return {
        schoolId: '',
        fundedId: '',
        headData: [],
        listData: [],
        total: 0,
        page: {
          page: 1,
          limit: 10
        },

        // 审核意见
        editId: '',
        isMore: false,
        rejectEdit: {
          content: ''
        },
        rejectModal: false,

        verifyData: []
      }
    },
    components: {vTable, Location, Nodata},
    methods: {
      // 获取列表
      getList() {
        let _data = _.merge({}, this.page, {
          schId: this.schoolId,
          fundId: this.fundedId,
          status: 10
        })

        io.get(api.fundProcess.member + '/' + this.fundedId, _data, (res) => {
          let data = res.data
          console.log(data)
          // this.headData = data.header
          this.listData = data.page
          // this.total = data.page.totalCount

          this.verifyData = []
          $('#all-check input').prop('checked', false)
          $('.check-box input').prop('checked', false)
        }, (res) => {
          this.$Message.error(res.data.msg)
        })
      },
      // 分页操作
      pageChange(page) {
        this.page.page = page
        this.getList()
      },
      // 单个审核通过
      verifyAgree(id) {
        this.isMore = false
        this.editId = id
        this.agreeInfo()
      },
      // 单个审核拒绝
      verifyReject(id) {
        this.isMore = false
        this.rejectModal = true
        this.editId = id
      },
      // 同意
      agreeInfo() {
        let ids = this.isMore ? this.verifyData : [this.editId]

        io.post(api.fundProcess.audit, {
          'pass': true,
          'schFundId': this.fundedId,
          'stuIds': ids
        }, (res) => {
          this.$Message.info(res.data.msg)
          this.getList()
        })
      },
      // 拒绝
      rejectInfo() {
        if (!this.rejectEdit.content) {
          this.$Message.error('请输入拒绝的理由')
          return
        }

        let ids = this.isMore ? this.verifyData : [this.editId]
        console.log(this.editId)
        io.post(api.fundProcess.audit, {
          'pass': false,
          'schFundId': this.fundedId,
          'stuIds': [this.editId],
          'remark': this.rejectEdit.content
        }, (res) => {
          this.$Message.info(res.data.msg)
          this.getList()
        })
      },
      // 批量同意
      agreeMore() {
        this.isMore = true
        this.agreeInfo()
      },
      // 批量拒绝
      rejectMore() {
        this.isMore = true
        this.rejectModal = true
      },
      // 添加checkbox
      addCheck() {
        $('.con').on('change', '#all-check input', (e) => {
          this.verifyData = []
          if ($(e.target).is(':checked')) {
            this.listData.forEach((item) => {
              this.verifyData.push(item.stu_id)
            })
            $('.check-box input').prop('checked', true)
          } else {
            $('.check-box input').prop('checked', false)
          }
        })

        $('.con').on('change', '.check-box input', (e) => {
          let _id = +$(e.target).attr('data-id')
          let _idx = this.verifyData.indexOf(_id)

          if ($(e.target).is(':checked')) {
            if (_idx === -1) {
              this.verifyData.push(_id)
            }
          } else {
            this.verifyData.splice(_idx, 1)
          }
        })
      }
    },
    watch: {
      verifyData(o) {
        if (o.length === this.listData.length) {
          $('#all-check input').prop('checked', true)
        } else {
          $('#all-check input').prop('checked', false)
        }
      }
    },
    mounted() {
      this.schoolId = this.$route.params.schId
      this.fundedId = this.$route.params.fundId
      this.getList()
      this.addCheck()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../../module/components/main";

  .wrapper {
    margin: 0 10px 20px 10px;
    .con {
      .page {
        margin-top: 10px;
      }
      .do-some {
        margin-bottom: 10px;
      }
      .form-con {
        margin-top: 15px;
        margin-bottom: 15px;
        .form-label {
          color: $form-label-color;
          height: 32px;
          line-height: 32px;
          text-align: right;
          font-size: 12px;
        }
        .else {
          position: relative;
          &::after {
            content: '-';
            position: absolute;
            right: -6px;
            top: 5px;
          }
        }
      }
    }
  }
</style>
