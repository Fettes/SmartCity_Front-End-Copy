<template>
  <div class="role">
    <Row>
      <Table highlight-row border ref="selection" :columns="tablecolumns" :data="tabledata"></Table>
      <!-- <Button @click="handleClearCurrentRow">Clear</Button> -->
    </Row>
    <br>
    <Row class="paging" type="flex" justify="end">
      <Page :total="totalNum" size="small" show-total show-elevator/>
    </Row>
    <br>
  </div>
</template>

<script>
// import tabledata from "./data/role_tabledata";

export default {
  name: "role-manage",
  data() {
    return {
      tablecolumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },

        {
          title: "角色名称",
          key: "role"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleEditUser(params.index);
                    }
                  }
                },
                "Edit"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ]
    };
  }
};
</script>
