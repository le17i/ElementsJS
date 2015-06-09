describe("Init the tests for ElementsJS", function() {

   it("Is defined.", function() {
      expect(els).toBeDefined();
   });
});

describe("Manipulates the DOM Element.", function() {
   var bodyElement;

   beforeEach(function() {
      bodyElement = els("body");
   });

   it("Selects a body element and must contains the property 'element'.", function() {
      expect(bodyElement.hasOwnProperty("element")).toBeTruthy();
   });

   it("Add class function.", function() {
      bodyElement.addClass("test");
      expect(bodyElement.attr("class")).toContain("test");
   });

   it("Remove class function.", function() {
      bodyElement.removeClass("test");
      expect(bodyElement.attr("class")).not.toContain("test");
   });

   it("Attr function. Sets and gets method.", function() {
      bodyElement.attr("data-value", "test");
      expect(bodyElement.attr("data-value")).toContain("test");
   });

   //it("Html function. Must return the HTML tags in string format.", function() {
   //   var html = bodyElement.html();
   //   expect(html).toMatch(/<body>(.*)<\/body>/g);
   //});
});
