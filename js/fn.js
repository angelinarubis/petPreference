function accessories_outcome (){

    if (accuracy_dogs > accuracy_cats && accessories_preference_dogs>accessories_preference_cats) {
        accessories_preference = "You like dogs more and most of them have accessories"
    } else if (accuracy_dogs > accuracy_cats &&accessories_preference_dogs<accessories_preference_cats) {
        accessories_preference ="You like dogs more and you prefer cats with accessories"
    } else if (accuracy_dogs <accuracy_cats && accessories_preference_dogs<accessories_preference_cats) {
        accessories_preference = "You like cats more and most of them have accessories"
    } else if (accuracy_dogs<accuracy_cats && accessories_preference_dogs>accessories_preference_cats) {
        accessories_preference = "You like cats more and you prefer dogs with accessories"
    };
};