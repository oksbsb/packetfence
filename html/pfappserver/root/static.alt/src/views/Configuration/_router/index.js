import store from '@/store'
import ConfigurationView from '../'
import RolesStore from '../_store/roles'
import FloatingDevicesStore from '../_store/floatingdevices'
import DomainsStore from '../_store/domains'
import RealmsStore from '../_store/realms'
import AuthenticationSourcesStore from '../_store/sources'

const PoliciesAccessControlSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/PoliciesAccessControlSection')
const RolesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/RolesList')
const RoleView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RoleView')
const DomainsTabs = () => import(/* webpackChunkName: "Configuration" */ '../_components/DomainsTabs')
const DomainView = () => import(/* webpackChunkName: "Configuration" */ '../_components/DomainView')
const RealmView = () => import(/* webpackChunkName: "Configuration" */ '../_components/RealmView')

const NetworkConfigurationSection = () => import(/* webpackChunkName: "Configuration" */ '../_components/NetworkConfigurationSection')
const FloatingDevicesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/FloatingDevicesList')
const FloatingDeviceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/FloatingDeviceView')

const AuthenticationSourcesList = () => import(/* webpackChunkName: "Configuration" */ '../_components/AuthenticationSourcesList')
const AuthenticationSourceView = () => import(/* webpackChunkName: "Configuration" */ '../_components/AuthenticationSourceView')

const route = {
  path: '/configuration',
  name: 'configuration',
  redirect: '/configuration/policesaccesscontrol',
  component: ConfigurationView,
  meta: { transitionDelay: 300 * 2 }, // See _transitions.scss => $slide-bottom-duration
  beforeEnter: (to, from, next) => {
    if (!store.state.$_roles) {
      store.registerModule('$_roles', RolesStore)
    }
    if (!store.state.$_domains) {
      store.registerModule('$_domains', DomainsStore)
    }
    if (!store.state.$_realms) {
      store.registerModule('$_realms', RealmsStore)
    }
    if (!store.state.$_floatingdevices) {
      store.registerModule('$_floatingdevices', FloatingDevicesStore)
    }
    if (!store.state.$_sources) {
      store.registerModule('$_sources', AuthenticationSourcesStore)
    }
    next()
  },
  children: [
    /**
     * Policies Access Control
     */
    {
      path: 'policesaccesscontrol',
      component: PoliciesAccessControlSection
    },
    {
      path: 'roles',
      name: 'roles',
      component: RolesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'roles/new',
      name: 'newRole',
      component: RoleView,
      props: (route) => ({ storeName: '$_roles', isNew: true })
    },
    {
      path: 'role/:id',
      name: 'role',
      component: RoleView,
      props: (route) => ({ storeName: '$_roles', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_roles/getRole', to.params.id).then(object => {
          next()
        })
      }
    },
    {
      path: 'domains',
      name: 'domains',
      component: DomainsTabs,
      props: (route) => ({ tab: 'domains', query: route.query.query })
    },
    {
      path: 'domains/new',
      name: 'newDomain',
      component: DomainView,
      props: (route) => ({ storeName: '$_domains', isNew: true })
    },
    {
      path: 'domain/:id',
      name: 'domain',
      component: DomainView,
      props: (route) => ({ storeName: '$_domains', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_domains/getDomain', to.params.id).then(object => {
          next()
        })
      }
    },
    {
      path: 'realms',
      name: 'realms',
      component: DomainsTabs,
      props: (route) => ({ tab: 'realms', query: route.query.query })
    },
    {
      path: 'realms/new',
      name: 'newRealm',
      component: RealmView,
      props: (route) => ({ storeName: '$_realms', isNew: true })
    },
    {
      path: 'realm/:id',
      name: 'realm',
      component: RealmView,
      props: (route) => ({ storeName: '$_realms', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_realms/getRealm', to.params.id).then(object => {
          next()
        })
      }
    },
    /**
     * Network Configuration
     */
    {
      path: 'networkconfiguration',
      component: NetworkConfigurationSection
    },
    {
      path: 'floating_devices',
      name: 'floating_devices',
      component: FloatingDevicesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'floating_devices/new',
      name: 'newFloatingDevice',
      component: FloatingDeviceView,
      props: (route) => ({ storeName: '$_floatingdevices', isNew: true })
    },
    {
      path: 'floating_device/:id',
      name: 'floating_device',
      component: FloatingDeviceView,
      props: (route) => ({ storeName: '$_floatingdevices', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_floatingdevices/getFloatingDevice', to.params.id).then(object => {
          next()
        })
      }
    },
    /**
     * AuthenticationSources
     */
    {
      path: 'sources',
      name: 'sources',
      component: AuthenticationSourcesList,
      props: (route) => ({ query: route.query.query })
    },
    {
      path: 'sources/new/:sourceType',
      name: 'newAuthenticationSource',
      component: AuthenticationSourceView,
      props: (route) => ({ storeName: '$_sources', isNew: true, sourceType: route.params.sourceType })
    },
    {
      path: 'source/:id',
      name: 'source',
      component: AuthenticationSourceView,
      props: (route) => ({ storeName: '$_sources', id: route.params.id }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_sources/getAuthenticationSource', to.params.id).then(object => {
          next()
        })
      }
    },
    {
      path: 'source/:id/clone',
      name: 'cloneAuthenticationSource',
      component: AuthenticationSourceView,
      props: (route) => ({ storeName: '$_sources', id: route.params.id, isClone: true }),
      beforeEnter: (to, from, next) => {
        store.dispatch('$_sources/getAuthenticationSource', to.params.id).then(object => {
          next()
        })
      }
    }
  ]
}

export default route
