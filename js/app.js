
// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// })

// var app2 = new Vue({
//   el: '#app-2',
//   data: {
//     message: 'You loaded this page on ' + new Date()
//   }
// })

var currentDay = new Vue({
    el: '#currentDay',
    data: {
        meals: [
            { 
                name: 'breakfast',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'lunch',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'dinner',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            },
            { 
                name: 'snacks',
                foods: [
                    {name:'apple',serving:1},
                    {name:'egg',serving:2},
                    {name:'coffee',serving:1}
                ],
            }
        ],
        myfoods: [
            // example data array
            // {
            //     name: undefined,
            //     meal: undefined,
            // },
        ],
        newfood: undefined,
    },
    methods: {
        // addNewFood: function () {
        //     console.log('adding new food')
        //     console.log(newfood)
        // }
    }

});

