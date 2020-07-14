/*
 * @Author: joanoor
 * @Mail: joanoor@outlook.com
 * @Github: https://github.com/joanoor
 */

import { basic } from './mixins/base'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from './store/index'

const computedBehavior = require('miniprogram-computed')

const relationFunctions = {
  ancestor: {   // 祖先
    linked(parent) {
      this.parent = parent;
    },
    unlinked() {
      this.parent = null;
    },
  },
  descendant: {   // 后代
    linked(child) {
      this.children = this.children || [];
      this.children.push(child);
    },
    unlinked(child) {
      this.children = (this.children || []).filter((it) => it !== child);
    },
  },
}

function mapKeys(source = {}, target = {}, map = {}) {
  Object.keys(map).forEach((key) => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function makeRelation(options, vantOptions, relation) {
  const { type, name, linked, unlinked, linkChanged } = relation;
  const { beforeCreate, destroyed } = vantOptions;
  if (type === 'descendant') {
    options.created = function () {
      beforeCreate && beforeCreate.bind(this)();
      this.children = this.children || [];
    };
    options.detached = function () {
      this.children = [];
      destroyed && destroyed.bind(this)();
    };
  }
  options.relations = Object.assign(options.relations || {}, {
    [`../${name}/index`]: {
      type,
      linked(node) {
        relationFunctions[type].linked.bind(this)(node);
        linked && linked.bind(this)(node);
      },
      linkChanged(node) {
        linkChanged && linkChanged.bind(this)(node);
      },
      unlinked(node) {
        relationFunctions[type].unlinked.bind(this)(node);
        unlinked && unlinked.bind(this)(node);
      },
    },
  });
}

function xComponent(vantOptions) {
  const options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses',
    storeBindings: 'storeBindings',        // 小程序MoBX
    computed: 'computed',                  // 小程序computed
    watch: 'watch'                         // 小程序watch
  });

  const { relation } = vantOptions;
  if (relation) {
    makeRelation(options, vantOptions, relation);
  }

  // add default store, each page will use it
  options.storeBindings = {
    store,
    fields: {
      username:()=>store.username
    },
    actions:['update']
  }

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');

  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);
  options.behaviors.push(storeBindingsBehavior);
  options.behaviors.push(computedBehavior);

  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }

  if (options.properties) {
    Object.keys(options.properties).forEach((name) => {
      if (Array.isArray(options.properties[name])) {
        // miniprogram do not allow multi type
        options.properties[name] = null;
      }
    });
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true,
  };

  Component(options);
}

export { xComponent };

