/// <reference path="../common/list.ts" />

class AchromaJS {

    private list: FiltersUIList;


    constructor() {
        this.list = new FiltersUIList(document.body);
    }


    public static init() {
        new AchromaJS();
    }
}


document.addEventListener('DOMContentLoaded', (event) => {
    AchromaJS.init();
});
