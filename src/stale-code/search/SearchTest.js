"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Search_1 = require("./Search");
const chai_1 = require("chai");
describe('GetExtension', function () {
    it("File extension getter", function () {
        var data = "file.txt";
        chai_1.assert.notEqual(Search_1.Stale.getExtension(data), undefined);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoVGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNlYXJjaFRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBaUM7QUFDakMsK0JBQThCO0FBRzlCLFFBQVEsQ0FBRSxjQUFjLEVBQUU7SUFDdEIsRUFBRSxDQUFFLHVCQUF1QixFQUFFO1FBQ3pCLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUN0QixhQUFNLENBQUMsUUFBUSxDQUFDLGNBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWxlIH0gZnJvbSBcIi4vU2VhcmNoXCI7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBFcnJub0V4Y2VwdGlvbiA9IE5vZGVKUy5FcnJub0V4Y2VwdGlvbjtcblxuZGVzY3JpYmUgKCdHZXRFeHRlbnNpb24nLCBmdW5jdGlvbigpIHtcbiAgICBpdCAoXCJGaWxlIGV4dGVuc2lvbiBnZXR0ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gXCJmaWxlLnR4dFwiO1xuICAgICAgICBhc3NlcnQubm90RXF1YWwoU3RhbGUuZ2V0RXh0ZW5zaW9uKGRhdGEpLCB1bmRlZmluZWQpO1xuICAgIH0pO1xufSk7XG4iXX0=