var denomination = angular.module('denomination',[]);
denomination.directive("calculateBuddy",function(){
    return{
        restrict:"AE",
        controller:"calculateBuddyCtrl",
        template:`
        <div class="main-sec">
        <div class="head-sec">
            <div class="header">
                Calculate Buddy
            </div>
        </div>
        <div class="body-sec">
            <div class="load-amt-sec primary-amt-sec">
                <label for="loadAmt">Load Amount</label>
                <input type="text" id="loadAmt" ng-model="loadAmt" ng-blur="formatOnBlur($event,loadAmt)" ng-focus="formatOnBlur($event,loadAmt)">
            </div>
            <div class="denomination-sec">
                <div>  
                    <label for="2000">2000  &nbsp&nbspX</label>
                    <input type="number" id="2000" ng-model="_2t" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_2t*2000 | INR}}</span>
                </div>
                <div>  
                    <label for="500">500    &nbsp&nbsp&nbspX</label>
                    <input type="number" id="500" ng-model="_5h" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_5h*500 | INR}}</span>
                </div>
                <div>  
                    <label for="200">200    &nbsp&nbsp&nbspX</label>
                    <input type="number" id="200" ng-model="_2h" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_2h*200 | INR}}</span>
                </div>
                <div>  
                    <label for="100">100    &nbsp&nbsp&nbspX</label>
                    <input type="number" id="100" ng-model="_1h" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_1h*100  | INR}}</span>
                </div>
                <div>  
                    <label for="50">50       &nbsp&nbsp&nbsp&nbspX</label>
                    <input type="number" id="50" ng-model="_5e" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_5e*50 | INR}}</span>
                </div>
                <div>  
                    <label for="20">20       &nbsp&nbsp&nbsp&nbspX</label>
                    <input type="number" id="20" ng-model="_2e" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_2e*20  | INR}}</span>
                </div>
                <div>  
                    <label for="10">10      &nbsp&nbsp&nbsp&nbspX</label>
                    <input type="number" id="10" ng-model="_1e" class="denom-input" ng-change=updateTotalCash()>
                    <span>{{_1e*10  | INR}}</span>
                </div>
            </div>
            <div class="other-accounts-sec">
                <div class="primary-amt-sec">
                    <label>Total Cash </label>
                    <div style="color:green;"> {{totalCash  | INR}} </div>
                </div>
                <div class="primary-amt-sec">
                    <label>DHR Account </label>
                    <input type="text" ng-model="dhrAcc" ng-blur="formatOnBlur($event,dhrAcc)" ng-focus="formatOnBlur($event,dhrAcc)">
                </div>
                <div class="primary-amt-sec">
                    <label>Madam Account </label>
                    <input type="text" ng-model="madamAcc" ng-blur="formatOnBlur($event,madamAcc)" ng-focus="formatOnBlur($event,madamAcc)">
                </div>
                <div class="primary-amt-sec">
                    <label>X-Sparsh Account</label>
                    <input type="text" ng-model="xsparshAcc" ng-blur="formatOnBlur($event,xsparshAcc)" ng-focus="formatOnBlur($event,xsparshAcc)">
                </div>
            </div>
            <div class="result-sec">
                    <lable>Final Amount:</label>
                    <span ng-if="result <= 0" style="color:green;">{{result | INR}}</span>
                    <span ng-if="result > 0" style="color:red;">{{result | INR}}</span>
            </div>
            
            <div class="advance-v2" style="display:none;">
                100, 200,500
                1,2,3,4,5
                6,7,8,9,0
            </div>
        </div>
    </div>
        `,
    }
}).controller("calculateBuddyCtrl",["$scope","$window","$filter",function($scope,$window,$filter){
    $scope.result = 0;
    $scope.totalCash = 0;
    $scope.updateTotalCash = () =>{
        $scope.totalCash = ( Number(($scope._2t || 0)*2000) +  Number(($scope._5h || 0)*500) +  Number(($scope._2h || 0)*200) +  Number(($scope._1h || 0)*100) +  Number(($scope._5e || 0)*50) +  Number(($scope._2e || 0)*20) +  Number(($scope._1e || 0)*10))
        $scope.result = Number($scope.loadAmt || 0) -( Number($scope.totalCash || 0) + Number($scope.dhrAcc || 0) + Number($scope.madamAcc || 0) + Number($scope.xsparshAcc || 0))
    }
    $scope.formatOnBlur = (event,modelValue) => {
        var elem = event.target;
        var toCurrency = $filter('INR');
        var hasFocus = elem == $window.document.activeElement
        if (!modelValue) { return; }
        var displayValue = hasFocus ?
                modelValue :
                toCurrency(modelValue);
        elem.value = displayValue;
        $scope.result = Number($scope.loadAmt || 0) -( Number($scope.totalCash || 0) + Number($scope.dhrAcc || 0) + Number($scope.madamAcc || 0) + Number($scope.xsparshAcc || 0))
    }
}]).filter('INR', function () {        
    return function (input) {
        if (! isNaN(input)) {
            var currencySymbol = '₹';
            //var output = Number(input).toLocaleString('en-IN');   <-- This method is not working fine in all browsers!           
            var result = input.toString().split('.');

            var lastThree = result[0].substring(result[0].length - 3);
            var otherNumbers = result[0].substring(0, result[0].length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
            if (result.length > 1) {
                output += "." + result[1];
            }            

            return currencySymbol + output;
        }
    }
}).directive('formatOnBlur', function ($filter, $window) {
    var toCurrency = $filter('INR');

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var rawElem = elem[0];
            if (!ctrl || !rawElem.hasOwnProperty('value')) return;

            elem.on('focus', updateView.bind(null, true));
            elem.on('blur',  updateView.bind(null, false));

            function updateView(hasFocus) {
                if (!ctrl.$modelValue) { return; }
                var displayValue = hasFocus ?
                        ctrl.$modelValue :
                        toCurrency(ctrl.$modelValue);
                rawElem.value = displayValue;
            }
            updateView(rawElem === $window.document.activeElement);
        }
    };
});