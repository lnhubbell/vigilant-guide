var nutritionApp = new Vue({
    el: '#nutritionApp',
    data: {
        foods: [],
        meals: [
            {
                name: 'breakfast',
                foods: [],
            },
            {
                name: 'lunch',
                foods: [],
            },
            {
                name: 'dinner',
                foods: [],
            },
            {
                name: 'snacks',
                foods: [],
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
        addNewFood: function () {
            console.log(this.meal.value)
            console.log(this.meals)
            console.log(this.newfood)
        },
        fetchFoodData: function(fetch) {

        },
        setMeal: function() {
            console.log('setting Meal')
            console.log(document.querySelector(meal).getAttribute('data-val'));

        },
    },
});



