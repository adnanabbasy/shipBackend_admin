import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

// const Faq = lazy(() => import('../../views/pages/faq'))
// const ApiKey = lazy(() => import('../../views/pages/api-key'))
// const Profile = lazy(() => import('../../views/pages/profile'))
// const Pricing = lazy(() => import('../../views/pages/pricing'))
// const License = lazy(() => import('../../views/pages/license'))
// const Error = lazy(() => import('../../views/pages/misc/Error'))
// const BlogList = lazy(() => import('../../views/pages/blog/list'))
// const BlogEdit = lazy(() => import('../../views/pages/blog/edit'))
// const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
// const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
// const ModalExamples = lazy(() => import('../../views/pages/modal-examples'))
// const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
// const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
// const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))
// const KnowledgeBase = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
// const KnowledgeBaseCategory = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory'))
// const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))

const MarineAdd = lazy(() => import('../../views/admin/marine/add'))
const MarineList = lazy(() => import('../../views/admin/marine/list'))
const MarineUpdate = lazy(() => import('../../views/admin/marine/update'))

const MarineCategoryAdd = lazy(() => import('../../views/admin/marine-category/add'))
const MarineCategoryList = lazy(() => import('../../views/admin/marine-category/list'))
const MarineCategoryUpdate = lazy(() => import('../../views/admin/marine-category/update'))

const MarineServiceAdd = lazy(() => import('../../views/admin/marine-service/add'))
const MarineServiceList = lazy(() => import('../../views/admin/marine-service/list'))
const MarineServiceUpdate = lazy(() => import('../../views/admin/marine-service/update'))

const MarineBrandAdd = lazy(() => import('../../views/admin/marine-brand/add'))
const MarineBrandList = lazy(() => import('../../views/admin/marine-brand/list'))
const MarineBrandUpdate = lazy(() => import('../../views/admin/marine-brand/update'))

const ReviewAdd = lazy(() => import('../../views/admin/reviews/add'))
const ReviewList = lazy(() => import('../../views/admin/reviews/list'))
const ReviewUpdate = lazy(() => import('../../views/admin/reviews/update'))

const BlogAdd = lazy(() => import('../../views/admin/blog/add'))
const BlogList = lazy(() => import('../../views/admin/blog/list'))
const BlogUpdate = lazy(() => import('../../views/admin/blog/update'))

const BlogCategoryAdd = lazy(() => import('../../views/admin/blog-category/add'))
const BlogCategoryList = lazy(() => import('../../views/admin/blog-category/list'))
const BlogCategoryUpdate = lazy(() => import('../../views/admin/blog-category/update'))

const CouponAdd = lazy(() => import('../../views/admin/coupon/add'))
const CouponList = lazy(() => import('../../views/admin/coupon/list'))
const CouponUpdate = lazy(() => import('../../views/admin/coupon/update'))

const PodcastAdd = lazy(() => import('../../views/admin/podcast/add'))
const PodcastList = lazy(() => import('../../views/admin/podcast/list'))
const PodcastUpdate = lazy(() => import('../../views/admin/podcast/update'))

const PagesRoutes = [
    {
        path: '/admin/marine/add',
        element: <MarineAdd />
    },
    {
        path: '/admin/marine/list',
        element: <MarineList />
    },
    {
        path: '/admin/marine/update/:id',
        element: <MarineUpdate />
    },


    {
        path: '/admin/marine-category/add',
        element: <MarineCategoryAdd />
    },
    {
        path: '/admin/marine-category/list',
        element: <MarineCategoryList />
    },
    {
        path: '/admin/marine-category/update/:id',
        element: <MarineCategoryUpdate />
    },


    {
        path: '/admin/marine-service/add',
        element: <MarineServiceAdd />
    },
    {
        path: '/admin/marine-service/list',
        element: <MarineServiceList />
    },
    {
        path: '/admin/marine-service/update/:id',
        element: <MarineServiceUpdate />
    },


    {
        path: '/admin/marine-brand/add',
        element: <MarineBrandAdd />
    },
    {
        path: '/admin/marine-brand/list',
        element: <MarineBrandList />
    },
    {
        path: '/admin/marine-brand/update/:id',
        element: <MarineBrandUpdate />
    },


    {
        path: '/admin/reviews/add',
        element: <ReviewAdd />
    },
    {
        path: '/admin/reviews/list',
        element: <ReviewList />
    },
    {
        path: '/admin/reviews/update/:id',
        element: <ReviewUpdate />
    },


    {
        path: '/admin/blog/add',
        element: <BlogAdd />
    },
    {
        path: '/admin/blog/list',
        element: <BlogList />
    },
    {
        path: '/admin/blog/update/:id',
        element: <BlogUpdate />
    },


    {
        path: '/admin/blog-category/add',
        element: <BlogCategoryAdd />
    },
    {
        path: '/admin/blog-category/list',
        element: <BlogCategoryList />
    },
    {
        path: '/admin/blog-category/update/:id',
        element: <BlogCategoryUpdate />
    },


    {
        path: '/admin/coupon/add',
        element: <CouponAdd />
    },
    {
        path: '/admin/coupon/list',
        element: <CouponList />
    },
    {
        path: '/admin/coupon/update/:id',
        element: <CouponUpdate />
    },


    {
        path: '/admin/podcast/add',
        element: <PodcastAdd />
    },
    {
        path: '/admin/podcast/list',
        element: <PodcastList />
    },
    {
        path: '/admin/podcast/update/:id',
        element: <PodcastUpdate />
    }

//   {
//     path: '/pages/profile',
//     element: <Profile />
//   },
//   {
//     path: '/pages/faq',
//     element: <Faq />
//   },
//   {
//     path: '/pages/knowledge-base',
//     element: <KnowledgeBase />
//   },
//   {
//     path: '/pages/knowledge-base/:category',
//     element: <KnowledgeBaseCategory />
//   },
//   {
//     path: '/pages/knowledge-base/:category/:question',
//     element: <KBCategoryQuestion />
//   },
//   {
//     path: '/pages/account-settings',
//     element: <AccountSettings />
//   },
//   {
//     path: '/pages/license',
//     element: <License />
//   },
//   {
//     path: '/pages/api-key',
//     element: <ApiKey />
//   },
//   {
//     path: '/pages/modal-examples',
//     element: <ModalExamples />
//   },
//   {
//     path: '/pages/blog/list',
//     element: <BlogList />
//   },
//   {
//     path: '/pages/blog/detail/:id',
//     element: <BlogDetails />
//   },
//   {
//     path: '/pages/blog/detail',
//     element: <Navigate to='/pages/blog/detail/1' />
//   },
//   {
//     path: '/pages/blog/edit/:id',
//     element: <BlogEdit />
//   },
//   {
//     path: '/pages/blog/edit',
//     element: <Navigate to='/pages/blog/edit/1' />
//   },
//   {
//     path: '/pages/pricing',
//     element: <Pricing />
//   },
//   {
//     path: '/misc/coming-soon',
//     element: <ComingSoon />,
//     meta: {
//       publicRoute: true,
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/misc/not-authorized',
//     element: <NotAuthorized />,
//     meta: {
//       publicRoute: true,
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/misc/maintenance',
//     element: <Maintenance />,
//     meta: {
//       publicRoute: true,
//       layout: 'blank'
//     }
//   },
//   {
//     path: '/misc/error',
//     element: <Error />,
//     meta: {
//       publicRoute: true,
//       layout: 'blank'
//     }
//   }
]

export default PagesRoutes
