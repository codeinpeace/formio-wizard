angular.module("formio.wizard",["formio"]).directive("formioWizard",function(){return{restrict:"E",replace:!0,template:'<div><i ng-show="!wizardLoaded" id="formio-loading" style="font-size: 2em;" class="glyphicon glyphicon-refresh glyphicon-spin"></i><div ng-repeat="alert in formioAlerts" class="alert alert-{{ alert.type }}" role="alert">{{ alert.message }}</div><div class="formio-wizard"></div><ul ng-show="wizardLoaded" class="list-inline"><li ng-if="currentPage > 0"><a class="btn btn-primary" ng-click="prev()">Previous</a></li><li ng-if="currentPage < (form.components.length - 1)"><a class="btn btn-primary" ng-click="next()">Next</a></li><li ng-if="currentPage >= (form.components.length - 1)"><a class="btn btn-primary" ng-click="submit()">Submit Form</a></li></ul></div>',scope:{src:"=",storage:"="},link:function(e,r){e.wizardLoaded=!1,e.wizardElement=angular.element(".formio-wizard",r)},controller:["$scope","$compile","Formio",function(e,r,o){var a=e.storage?localStorage.getItem(e.storage):!1;a&&(a=angular.fromJson(a)),e.formio=new o(e.src),e.page={},e.form={},e.submission={data:a?a.data:{}},e.currentPage=a?a.page:0;var n=function(){e.wizardLoaded=!1,e.storage&&localStorage.setItem(e.storage,angular.toJson({page:e.currentPage,data:e.submission.data})),e.page.components=e.form.components[e.currentPage].components;var o=angular.element(document.createElement("formio"));e.wizardElement.html(r(o.attr({form:"page",submission:"submission"}))(e)),e.wizardLoaded=!0};e.submit=function(){e.formio.saveSubmission(angular.copy(e.submission)).then(function(r){e.storage&&localStorage.setItem(e.storage,""),e.$emit("formSubmission",r)})},e.next=function(){e.currentPage>=e.form.components.length-1||(e.currentPage++,n())},e.prev=function(){e.currentPage<1||(e.currentPage--,n())},e.formio.loadForm().then(function(r){e.form=r,e.page=angular.copy(r),n()})}]}});