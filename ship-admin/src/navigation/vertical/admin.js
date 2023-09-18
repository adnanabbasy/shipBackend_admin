// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'

export default [
  {
    id: 'marines',
    title: 'Marines',
    icon: <FileText size={20} />,
    children: [
        {
            id: 'marineAdd',
            title: 'Add',
            icon: <Circle sie={12} />,
            permissions: ['admin', 'editor'],
            navLink: '/admin/marine/add'
        },
        {
            id: 'marineList',
            title: 'List',
            icon: <Circle sie={12} />,
            permissions: ['admin', 'editor'],
            navLink: '/admin/marine/list'
        },
        // {
        //     id: 'marineUpdate',
        //     title: 'Update Marine',
        //     icon: <Circle sie={12} />,
        //     permissions: ['admin', 'editor'],
        //     navLink: '/admin/marine/update'
        // },
      {
        id: 'accountSettings',
        title: 'Account Settings',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/account-settings'
      },
      {
        id: 'profile',
        title: 'Profile',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/profile',
        collapsed: true
      },
      {
        id: 'faq',
        title: 'FAQ',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/faq'
      },
      {
        id: 'knowledgeBase',
        title: 'Knowledge Base',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/knowledge-base',
        parentOf: ['/pages/knowledge-base/category/questions', '/pages/knowledge-base/category']
      },
      {
        id: 'pricing',
        title: 'Pricing',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/pricing'
      },
      {
        id: 'license',
        title: 'License',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/license'
      },
      {
        id: 'api-key',
        title: 'API Key',
        icon: <Circle size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/pages/api-key'
      },
      {
        id: 'blog',
        title: 'Blog',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'blogList',
            title: 'List',
            permissions: ['admin', 'editor'],
            navLink: '/pages/blog/list'
          },
          {
            id: 'blogDetail',
            title: 'Detail',
            permissions: ['admin', 'editor'],
            navLink: '/pages/blog/detail'
          },
          {
            id: 'blogEdit',
            title: 'Edit',
            permissions: ['admin', 'editor'],
            navLink: '/pages/blog/edit'
          }
        ]
      },
      {
        id: 'mailTemplate',
        title: 'Mail Template',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'welcomeTemp',
            title: 'Welcome',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html',
            newTab: true,
            externalLink: true
          },
          {
            id: 'resetPassTemp',
            title: 'Reset Password',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html',
            newTab: true,
            externalLink: true
          },
          {
            id: 'verifyEmailTemp',
            title: 'Verify Email',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html',
            newTab: true,
            externalLink: true
          },
          {
            id: 'deactivateAccountTemp',
            title: 'Deactivate Account',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html',
            newTab: true,
            externalLink: true
          },
          {
            id: 'invoiceMailTemp',
            title: 'Invoice',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html',
            newTab: true,
            externalLink: true
          },
          {
            id: 'promotionalMailTemp',
            title: 'Promotional',
            permissions: ['admin', 'editor'],
            navLink: 'https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html',
            newTab: true,
            externalLink: true
          }
        ]
      },
      {
        id: 'miscellaneous',
        title: 'Miscellaneous',
        icon: <Circle size={12} />,
        children: [
          {
            id: 'comingSoon',
            title: 'Coming Soon',
            permissions: ['admin', 'editor'],
            navLink: '/misc/coming-soon',
            newTab: true
          },

          {
            id: 'notAuthorized',
            title: 'Not Authorized',
            permissions: ['admin', 'editor'],
            navLink: '/misc/not-authorized',
            newTab: true
          },
          {
            id: 'maintenance',
            title: 'Maintenance',
            permissions: ['admin', 'editor'],
            navLink: '/misc/maintenance',
            newTab: true
          },
          {
            id: 'error',
            title: 'Error',
            permissions: ['admin', 'editor'],
            navLink: '/misc/error',
            newTab: true
          }
        ]
      }
    ]
  },
  {
    id: 'marines-category',
    title: 'Marines category',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'marineCategoryAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-category/add'
      },
      {
          id: 'marineCategoryList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-category/list'
      },
      // {
      //     id: 'marineCategoryUpdate',
      //     title: 'Update Marine Category',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/marine-category/update'
      // },
    ]
  },
  {
    id: 'marines-service',
    title: 'Marines Service',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'marineServiceAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-service/add'
      },
      {
          id: 'marineServiceList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-service/list'
      },
      // {
      //     id: 'marineCategoryUpdate',
      //     title: 'Update Marine Category',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/marine-category/update'
      // },
    ]
  },
  {
    id: 'marines-brand',
    title: 'Marines Brand',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'marineBrandAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-brand/add'
      },
      {
          id: 'marineBrandList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/marine-brand/list'
      },
      // {
      //     id: 'marineBrandUpdate',
      //     title: 'Update Marine Category',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/marine-category/update'
      // },
    ]
  },
  {
    id: 'review',
    title: 'Reviews',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'reviewAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/reviews/add'
      },
      {
          id: 'reviewList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/reviews/list'
      },
      // {
      //     id: 'marineBrandUpdate',
      //     title: 'Update Marine Category',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/marine-category/update'
      // },
    ]
  },
  {
    id: 'blogs',
    title: 'Blogs',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'blogAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/blog/add'
      },
      {
          id: 'blogList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/blog/list'
      },
      // {
      //     id: 'blogUpdate',
      //     title: 'Update',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/blog/update'
      // },
    ]
  },
  {
    id: 'blogCategory',
    title: 'Blogs Category',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'blogAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/blog-category/add'
      },
      {
          id: 'blogList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/blog-category/list'
      },
      // {
      //     id: 'blogUpdate',
      //     title: 'Update',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/blog/update'
      // },
    ]
  },
  {
    id: 'coupon',
    title: 'Coupon',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'couponAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/coupon/add'
      },
      {
          id: 'couponList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/coupon/list'
      },
      // {
      //     id: 'blogUpdate',
      //     title: 'Update',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/blog/update'
      // },
    ]
  },
  {
    id: 'podcast',
    title: 'Podcast',
    icon: <FileText size={20} />,
    children: [
      {
          id: 'podcastAdd',
          title: 'Add',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/podcast/add'
      },
      {
          id: 'podcastList',
          title: 'List',
          icon: <Circle sie={12} />,
          permissions: ['admin', 'editor'],
          navLink: '/admin/podcast/list'
      },
      // {
      //     id: 'podcastUpdate',
      //     title: 'Update',
      //     icon: <Circle sie={12} />,
      //     permissions: ['admin', 'editor'],
      //     navLink: '/admin/podcast/update'
      // },
    ]
  }
]
