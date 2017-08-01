// import RouteOne from './RouteOne.vue';
// import RouteOneChild from './RouteOneChild.vue';
// import RouteTwo from './RouteTwo.vue';

// export default [
//   // Redirects to /route-one as the default route.
//   {
//     path: '/',
//     redirect: '/route-one'
//   },
//   {
//     path: '/route-one',
//     component: RouteOne,
//     // Children is just another route definition of sub-routes.
//     children: [
//       {
//         // Note: No leading slash. This can trip people up sometimes.
//         path: 'route-one-child',
//         component: RouteOneChild
//       }
//     ]
//   },
//   {
//     // Route two takes the route parameter "id".
//     // The parameter value can be accessed with $route.params.id in the RouteTwo component.
//     path: '/route-two/:id',
//     component: RouteTwo
//   }
// ];