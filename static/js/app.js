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
        },
        low_nutrients: [],
        recommended_foods_map: {
            "435": ["16357", "16370"],
            "406": ["16097", "05718"],
            "405": ["17225", "12061"],
            "404": ["11811", "12151"],
            "318": ["11124", "11510", "11790"],
            "415": ["15221", "09037"],
            "418": ["15088", "15047"]
        },
        recommended_foods: []
    },
    methods: {
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
                item.nutrients = {
                    // "435": 0,
                    // "406": 0,
                    // "405": 0,
                    // "404": 0,
                    // "318": 0,
                    // "415": 0,
                    // "418": 0

                };
                // setNutrientTotals(item.nutrients, 'zero');

                for (var k=0; k<this.nutrient_ids.length; k++) {
                    item.nutrients[this.nutrient_ids[k]] = 0;
                }


                for (var i = nutrients.length - 1; i >= 0; i--) {
                    if (this.nutrient_ids.indexOf(nutrients[i].nutrient_id) > -1) {
                        item.nutrients[nutrients[i].nutrient_id] = {
                            name: nutrients[i].name,
                            value: nutrients[i].value
                        };
                    }
                }

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
                item.nutrients = {
                    "435": 0,
                    "406": 0,
                    "405": 0,
                    "404": 0,
                    "318": 0,
                    "415": 0,
                    "418": 0

                };
                for (var i = nutrients.length - 1; i >= 0; i--) {
                    if (this.nutrient_ids.indexOf(nutrients[i].nutrient_id) > -1) {
                        item.nutrients[nutrients[i].nutrient_id] = {
                            name: nutrients[i].name,
                            value: nutrients[i].value
                        };
                    }
                }
                console.log('processed item: ', item);
                return item

            }, response => {
            });
        },
        setNutrientTotals: function(attribute, fn) {
            switch (fn) {
                case 'zero':
                    for (var i=0; i<this.nutrient_ids.length; i++) {
                        this.nutrient_totals[this.nutrient_ids[i]] = 0;
                    }
                    break;
                case 'total':
                    for (var j=0; j<this.nutrient_ids.length; j++) {
                        this.nutrient_totals[this.nutrient_ids[j]] +=
                            parseFloat(attribute[this.nutrient_ids[j]].value);
                    }
                    break;
            }
        },
        tallyNutrientsForSelection: function(food) {
            for (var i=0; i<this.nutrient_ids.length; i++) {
                food.nutrients[this.nutrient_ids[i]].value *=
                    this.newFood.servingSize;
            }
            console.log(this.newFood)
        },
        totalNutrients: function() {
            for (var i=0; i<this.nutrient_ids.length; i++) {
                this.nutrient_totals[this.nutrient_ids[i]] = 0;
            }
            // this.setNutrientIds(null,'zero');

            for (var k = this.selected_foods.length - 1; k >= 0; k--) {
                var food = this.selected_foods[k];

                for (var j=0; j<this.nutrient_ids.length; j++) {
                    this.nutrient_totals[this.nutrient_ids[j]] += parseFloat(food.nutrients[this.nutrient_ids[j]].value);
                }
                // this.setNutrientIds(food.nutrients,'total');
            }
        },
        lowNutrients: function() {
            this.low_nutrients = [];
            for (var i = this.nutrient_ids.length - 1; i >= 0; i--) {
                var nid = this.nutrient_ids[i];
                if ((this.nutrient_minimums[nid] - this.nutrient_totals[nid]) > 0) {
                    this.low_nutrients.push(nid);
                };
            }
        },
        getRecommendations: function() {
            console.log('getting recommended_foods');
            this.lowNutrients();
            console.log('low_nutrients: ', this.low_nutrients);
            for (var i = this.low_nutrients.length - 1; i >= 0; i--) {
                var foods = this.recommended_foods_map[this.low_nutrients[i]];
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
                item.nutrients = {
                    "435": 0,
                    "406": 0,
                    "405": 0,
                    "404": 0,
                    "318": 0,
                    "415": 0,
                    "418": 0

                };
                for (var i = nutrients.length - 1; i >= 0; i--) {
                    if (this.nutrient_ids.indexOf(nutrients[i].nutrient_id) > -1) {
                        item.nutrients[nutrients[i].nutrient_id] = {
                            name: nutrients[i].name,
                            value: nutrients[i].value
                        };
                    }
                }
                console.log('processed item: ', item);

                this.recommended_foods.push(item);

            }, response => {
            });

        },

    },
});



