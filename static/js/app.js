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
        // search results
        foods: [],
        // foods selected by user and added to the log
        selected_foods: [],
        newFood: {
            name: '',
            meal: '',
            servingType: '',
            servingSize: '',
            foodObj: {},
        },
        // User search input
        newfoodinput: undefined,
        meals: [ 'breakfast', 'lunch', 'dinner', 'snacks' ],
        servingTypes: [],
        nutrients: [
            {
                id: "435",
                total: 0,
                minimum: 400,
                food_map: ["16357", "16370"]
            },
            {
                id: "406",
                total: 0,
                minimum: 20,
                food_map: ["16097", "05718"]
            },
            {
                id: "405",
                total: 0,
                minimum: 1.7,
                food_map: ["17225", "12061"]
            },
            {
                id: "404",
                total: 0,
                minimum: 1.5,
                food_map: ["11811", "12151"]
            },
            {
                id: "318",
                total: 0,
                minimum: 1000,
                food_map: ["11124", "11510", "11790"]
            },
            {
                id: "415",
                total: 0,
                minimum: 2,
                food_map: ["15221", "09037"]
            },
            {
                id: "418",
                total: 0,
                minimum: 6,
                food_map: ["15088", "15047"]
            }
        ],
        low_nutrients: [],
        recommended_foods: []
    },
    methods: {
        nutrientsHaveId: function(id) {
            for (var i = this.nutrients.length - 1; i >= 0; i--) {
                if (this.nutrients[i].id == id) {return true};
            }
            return false
        },
        nutrientById: function(id) {
            for (var i = this.nutrients.length - 1; i >= 0; i--) {
                if (this.nutrients[i].id == id) {return this.nutrients[i]};
            }
            return false
        },
        addNewFood: function() {
            // calculate the nutrients based on the total servings
            this.tallyNutrientsForSelection(this.newFood.foodObj);

            this.selected_foods.push(this.newFood.foodObj);

            // TODO [lji] Add error handling / required inputs

            this.totalNutrients();

            this.newFood = {
                name: '',
                meal: '',
                servingType: '',
                servingSize: '',
                foodObj: {},
            };
        },
        fetchFoodData: function(fetch) {
            // retrieves the search results for the user
            this.$http.get('http://127.0.0.1:3000/search?search_term=' + fetch).then(response => {
                nutritionApp.foods = response.body.list.item;
            }, response => {
            });
        },
        addNutrientsToItem: function(item, nutrients) {
            item.nutrients = {};

            for (var k=0; k<this.nutrients.length; k++) {
                item.nutrients[this.nutrients[k].id] = 0;
            }


            for (var i = nutrients.length - 1; i >= 0; i--) {
                if (this.nutrientsHaveId(nutrients[i].nutrient_id)) {
                    item.nutrients[nutrients[i].nutrient_id] = {
                        name: nutrients[i].name,
                        value: nutrients[i].value
                    };
                }
            }
            return item
        },
        selectFood: function(item) {
            this.newFood = {
                name: '',
                meal: '',
                servingType: '',
                servingSize: '',
                foodObj: {},
            };

            this.$http.get('http://127.0.0.1:3000/item?ndbno=' + item.ndbno).then(response => {

                var someData = response.body;
                var nutrients = someData.report.food.nutrients;

                item = this.addNutrientsToItem(item, nutrients);

                this.servingTypes = [];
                for (var j=0; j<nutrients[j].measures.length; j++) {
                    this.servingTypes.push(nutrients[j].measures[j].label)
                }

                console.log('processed item: ', item);

                this.newFood.name = item.name;
                this.newFood.foodObj = item;
                // clear the search results
                this.foods = [];
                newfoodinput = '';

            }, response => {
            });

        },

        processFood: function(item) {
            this.$http.get('http://127.0.0.1:3000/item?ndbno=' + item.ndbno).then(response => {

                var someData = response.body;
                var nutrients = someData.report.food.nutrients;

                item = this.addNutrientsToItem(item, nutrients);

                console.log('processed item: ', item);
                return item

            }, response => {
            });
        },
        tallyNutrientsForSelection: function(food) {
            for (var i = this.nutrients.length - 1; i >= 0; i--) {
                food.nutrients[this.nutrients[i].id].value *=
                    this.newFood.servingSize;
            }
            console.log(this.newFood)
        },
        totalNutrients: function() {
            for (var i = this.nutrients.length - 1; i >= 0; i--) {
                this.nutrients[i].total = 0;
            }

            for (var k = this.selected_foods.length - 1; k >= 0; k--) {
                var food = this.selected_foods[k];

                for (var j = this.nutrients.length - 1; j >= 0; j--) {
                    this.nutrients[j].total += parseFloat(food.nutrients[this.nutrients[j].id].value);
                }
            }
        },
        lowNutrients: function() {
            this.low_nutrients = [];
            for (var i = this.nutrients.length - 1; i >= 0; i--) {
                var nid = this.nutrients[i].id;
                if ((this.nutrients[i].minimum - this.nutrients[i].total) > 0) {
                    this.low_nutrients.push(nid);
                };
            }

        },
        getRecommendations: function() {
            console.log('getting recommended_foods');
            this.lowNutrients();
            console.log('low_nutrients: ', this.low_nutrients);
            for (var i = this.low_nutrients.length - 1; i >= 0; i--) {

                var foods = this.nutrientById(this.low_nutrients[i]).food_map;

                console.log('foods', foods);
                for (var f = foods.length - 1; f >= 0; f--) {
                    var food = foods[f];
                    this.recommendFood(food);
                }
                console.log('length: ', this.low_nutrients.length );
            }
        },
        recommendFood: function(ndbno) {

            this.$http.get('http://127.0.0.1:3000/item?ndbno=' + ndbno).then(response => {
                var someData = response.body;
                console.log('recommended food: ', someData);
                var nutrients = someData.report.food.nutrients;
                var item = someData.report.food;

                item = this.addNutrientsToItem(item, nutrients);

                console.log('processed item: ', item);

                this.recommended_foods.push(item);

            }, response => {
            });

        },

    },
});



