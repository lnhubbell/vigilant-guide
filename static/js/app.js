Vue.filter('round', function(value, decimals) {
    if(!value) {
        value = 0;
    }

    if(!decimals) {
        decimals = 3;
    }

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
});

var nutritionApp = new Vue({
    el: '#nutritionApp',
    data: {
        foods: [],
        selected_foods: [],
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
        nutrient_ids: [
            "435",
            "406",
            "405",
            "404",
            "318",
            "415",
            "418"
        ],
        nutrient_totals: {
            "435": 0,
            "406": 0,
            "405": 0,
            "404": 0,
            "318": 0,
            "415": 0,
            "418": 0
        },
        nutrient_minimums: {
            "435": 400,
            "406": 20,
            "405": 1.7,
            "404": 1.5,
            "318": 1000,
            "415": 2,
            "418": 6
        }
    },
    methods: {
        addNewFood: function () {
            console.log(this.meal.value)
            console.log(this.meals)
            console.log(this.newfood)
        },
        fetchFoodData: function(fetch) {
            this.$http.get('http://127.0.0.1:3000/search?search_term=' + fetch).then(response => {
                nutritionApp.foods = response.body.list.item;
            }, response => {
            });
        },
        selectFood: function(item) {

            this.$http.get('http://127.0.0.1:3000/item?ndbno=' + item.ndbno).then(response => {

                var someData = response.body;
                var nutrients = someData.report.food.nutrients;
                item.nutrients = {
                    "435": 0,
                    "406": 0,
                    "405": 0,
                    "404": 0,
                    "318": 0,
                    "415": 0,
                    "418": 0

                }
                for (var i = nutrients.length - 1; i >= 0; i--) {
                    if (this.nutrient_ids.indexOf(nutrients[i].nutrient_id) > -1) {
                        item.nutrients[nutrients[i].nutrient_id] = {
                            name: nutrients[i].name,
                            value: nutrients[i].value
                        };
                    };
                };
                console.log('processed item: ', item);

                this.selected_foods.push(item);
                this.totalNutrients();

            }, response => {
            });

        },
        totalNutrients: function() {
            this.nutrient_totals = {
                "435": 0,
                "406": 0,
                "405": 0,
                "404": 0,
                "318": 0,
                "415": 0,
                "418": 0
            };
            for (var i = this.selected_foods.length - 1; i >= 0; i--) {
                var food = this.selected_foods[i]
                this.nutrient_totals[435] += parseFloat(food.nutrients[435].value);
                this.nutrient_totals[406] += parseFloat(food.nutrients[406].value);
                this.nutrient_totals[405] += parseFloat(food.nutrients[405].value);
                this.nutrient_totals[404] += parseFloat(food.nutrients[404].value);
                this.nutrient_totals[318] += parseFloat(food.nutrients[318].value);
                this.nutrient_totals[415] += parseFloat(food.nutrients[415].value);
                this.nutrient_totals[418] += parseFloat(food.nutrients[418].value);
            };

        }
    },
});



