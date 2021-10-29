var denomination = angular.module('denomination',['ui.router']);
denomination.directive("calculateBuddy",function(){
    return{
        restrict:"AE",
        controller:"calculateBuddyCtrl",
        template:`
        <div class="main-sec">
        <div class="head-sec">
            <div class="go-back" ng-click="goBack()">Back</div>
            <div class="header">
                Denomination - V.1
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
}).controller("calculateBuddyCtrl",["$scope","$window","$filter","$state",function($scope,$window,$filter,$state){
    $scope.result = 0;
    $scope.totalCash = 0;
    $scope.goBack = () =>{
        $state.go("main")
    };
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
    $scope.dipTable = [
        {
            "id": "1",
            "reading": "0.5",
            "volume": "4.47",
            "extra": "0 "
        },
        {
            "id": "2",
            "reading": "1",
            "volume": "12.64",
            "extra": "1.63"
        },
        {
            "id": "3",
            "reading": "1.5",
            "volume": "23.21",
            "extra": "2.11"
        },
        {
            "id": "4",
            "reading": "2",
            "volume": "35.72",
            "extra": "2.5"
        },
        {
            "id": "5",
            "reading": "2.5",
            "volume": "49.88",
            "extra": "2.83"
        },
        {
            "id": "6",
            "reading": "3",
            "volume": "65.52",
            "extra": "3.13"
        },
        {
            "id": "7",
            "reading": "3.5",
            "volume": "82.5",
            "extra": "3.4"
        },
        {
            "id": "8",
            "reading": "4",
            "volume": "100.73",
            "extra": "3.65"
        },
        {
            "id": "9",
            "reading": "4.5",
            "volume": "120.1",
            "extra": "3.87"
        },
        {
            "id": "10",
            "reading": "5",
            "volume": "140.56",
            "extra": "4.09"
        },
        {
            "id": "11",
            "reading": "5.5",
            "volume": "162.03",
            "extra": "4.29"
        },
        {
            "id": "12",
            "reading": "6",
            "volume": "184.49",
            "extra": "4.49"
        },
        {
            "id": "13",
            "reading": "6.5",
            "volume": "207.86",
            "extra": "4.67"
        },
        {
            "id": "14",
            "reading": "7",
            "volume": "232.12",
            "extra": "4.85"
        },
        {
            "id": "15",
            "reading": "7.5",
            "volume": "257.24",
            "extra": "5.02"
        },
        {
            "id": "16",
            "reading": "8",
            "volume": "283.17",
            "extra": "5.19"
        },
        {
            "id": "17",
            "reading": "8.5",
            "volume": "309.88",
            "extra": "5.34"
        },
        {
            "id": "18",
            "reading": "9",
            "volume": "337.36",
            "extra": "5.5"
        },
        {
            "id": "19",
            "reading": "9.5",
            "volume": "365.58",
            "extra": "5.64"
        },
        {
            "id": "20",
            "reading": "10",
            "volume": "394.52",
            "extra": "5.79 "
        },
        {
            "id": "21",
            "reading": "10.5",
            "volume": "424.14",
            "extra": "5.92"
        },
        {
            "id": "22",
            "reading": "11",
            "volume": "454.44",
            "extra": "6.06"
        },
        {
            "id": "23",
            "reading": "11.5",
            "volume": "485.4",
            "extra": "6.19"
        },
        {
            "id": "24",
            "reading": "12",
            "volume": "516.99",
            "extra": "6.32"
        },
        {
            "id": "25",
            "reading": "12.5",
            "volume": "549.21",
            "extra": "6.44"
        },
        {
            "id": "26",
            "reading": "13",
            "volume": "582.04",
            "extra": "6.57"
        },
        {
            "id": "27",
            "reading": "13.5",
            "volume": "615.45",
            "extra": "6.68"
        },
        {
            "id": "28",
            "reading": "14",
            "volume": "649.45",
            "extra": "6.8"
        },
        {
            "id": "29",
            "reading": "14.5",
            "volume": "684.01 ",
            "extra": "6.91"
        },
        {
            "id": "30",
            "reading": "15",
            "volume": "719.13 ",
            "extra": "7.02"
        },
        {
            "id": "31",
            "reading": "15.5",
            "volume": "754.79",
            "extra": "7.13"
        },
        {
            "id": "32",
            "reading": "16",
            "volume": "790.98",
            "extra": "7.24 "
        },
        {
            "id": "33",
            "reading": "16.5",
            "volume": "827.69",
            "extra": "7.34"
        },
        {
            "id": "34",
            "reading": "17",
            "volume": "864.91",
            "extra": "7.44"
        },
        {
            "id": "35",
            "reading": "17.5",
            "volume": "902.62",
            "extra": "7.54"
        },
        {
            "id": "36",
            "reading": "18",
            "volume": "940.83",
            "extra": "7.64"
        },
        {
            "id": "37",
            "reading": "18.5",
            "volume": "979.52",
            "extra": "7.74"
        },
        {
            "id": "38",
            "reading": "19",
            "volume": "1018.69",
            "extra": "7.83"
        },
        {
            "id": "39",
            "reading": "19.5",
            "volume": "1058.31",
            "extra": "7.92"
        },
        {
            "id": "40",
            "reading": "20",
            "volume": "1098.4",
            "extra": "8.02"
        },
        {
            "id": "41",
            "reading": "20.5",
            "volume": "1138.93",
            "extra": "8.11"
        },
        {
            "id": "42",
            "reading": "21",
            "volume": "1179.9",
            "extra": "8.19"
        },
        {
            "id": "43",
            "reading": "21.5",
            "volume": "1221.3",
            "extra": "8.28"
        },
        {
            "id": "44",
            "reading": "22",
            "volume": "1263.13",
            "extra": "8.37 "
        },
        {
            "id": "45",
            "reading": "22.5",
            "volume": "1305.38",
            "extra": "8.45"
        },
        {
            "id": "46",
            "reading": "23",
            "volume": "1348.04",
            "extra": "8.53"
        },
        {
            "id": "47",
            "reading": "23.5",
            "volume": "1391.1",
            "extra": "8.61"
        },
        {
            "id": "48",
            "reading": "24",
            "volume": "1434.57",
            "extra": "8.69"
        },
        {
            "id": "49",
            "reading": "24.5",
            "volume": "1478.43",
            "extra": "8.77"
        },
        {
            "id": "50",
            "reading": "25",
            "volume": "1552.67",
            "extra": "14.85"
        },
        {
            "id": "51",
            "reading": "25.5",
            "volume": "1567.29",
            "extra": "2.92"
        },
        {
            "id": "52",
            "reading": "26",
            "volume": "1612.29",
            "extra": "9"
        },
        {
            "id": "53",
            "reading": "26.5",
            "volume": "1657.66",
            "extra": "9.07"
        },
        {
            "id": "54",
            "reading": "27",
            "volume": "1703.4",
            "extra": "9.15"
        },
        {
            "id": "55",
            "reading": "27.5",
            "volume": "1749.49",
            "extra": "9.22 "
        },
        {
            "id": "56",
            "reading": "28",
            "volume": "1795.94",
            "extra": "9.29"
        },
        {
            "id": "57",
            "reading": "28.5",
            "volume": "1842.73",
            "extra": "9.36"
        },
        {
            "id": "58",
            "reading": "29",
            "volume": "1889.87",
            "extra": "9.43 "
        },
        {
            "id": "59",
            "reading": "29.5",
            "volume": "1937.35",
            "extra": "9.5"
        },
        {
            "id": "60",
            "reading": "30",
            "volume": "1985.16",
            "extra": "9.56"
        },
        {
            "id": "61",
            "reading": "30.5",
            "volume": "2033.3",
            "extra": "9.63"
        },
        {
            "id": "62",
            "reading": "31",
            "volume": "2081.76",
            "extra": "9.69"
        },
        {
            "id": "63",
            "reading": "31.5",
            "volume": "2130.55",
            "extra": "9.76"
        },
        {
            "id": "64",
            "reading": "32",
            "volume": "2179.65",
            "extra": "9.82"
        },
        {
            "id": "65",
            "reading": "32.5",
            "volume": "2229.06",
            "extra": "9.88"
        },
        {
            "id": "66",
            "reading": "33",
            "volume": "2278.78",
            "extra": "9.94"
        },
        {
            "id": "67",
            "reading": "33.5",
            "volume": "2328.8",
            "extra": "10"
        },
        {
            "id": "68",
            "reading": "34",
            "volume": "2379.12",
            "extra": "10.06"
        },
        {
            "id": "69",
            "reading": "34.5",
            "volume": "2429.74",
            "extra": "10.12"
        },
        {
            "id": "70",
            "reading": "35",
            "volume": "2480.65 ",
            "extra": "10.18 "
        },
        {
            "id": "71",
            "reading": "35.5",
            "volume": "2531.84",
            "extra": "10.24"
        },
        {
            "id": "72",
            "reading": "36",
            "volume": "2583.32",
            "extra": "10.3"
        },
        {
            "id": "73",
            "reading": "36.5",
            "volume": "2635.08",
            "extra": "10.35"
        },
        {
            "id": "74",
            "reading": "37",
            "volume": "2687.12",
            "extra": "10.41"
        },
        {
            "id": "75",
            "reading": "37.5",
            "volume": "2739.42 ",
            "extra": "10.46"
        },
        {
            "id": "76",
            "reading": "38",
            "volume": "2792",
            "extra": "10.52"
        },
        {
            "id": "77",
            "reading": "38.5",
            "volume": "2844.84",
            "extra": "10.57"
        },
        {
            "id": "78",
            "reading": "39",
            "volume": "2897.95",
            "extra": "10.62"
        },
        {
            "id": "79",
            "reading": "39.50 ",
            "volume": "2951.31",
            "extra": "10.67"
        },
        {
            "id": "80",
            "reading": "40",
            "volume": "3004.92",
            "extra": "10.72"
        },
        {
            "id": "81",
            "reading": "40.50 ",
            "volume": "3058.79",
            "extra": "10.77"
        },
        {
            "id": "82",
            "reading": "41",
            "volume": "3112.91",
            "extra": "10.82"
        },
        {
            "id": "83",
            "reading": "41.5",
            "volume": "3167.28",
            "extra": "10.87"
        },
        {
            "id": "84",
            "reading": "42",
            "volume": "3221.88",
            "extra": "10.92 "
        },
        {
            "id": "85",
            "reading": "42.5",
            "volume": "3276.73",
            "extra": "10.97"
        },
        {
            "id": "86",
            "reading": "43",
            "volume": "3331.81",
            "extra": "11.02"
        },
        {
            "id": "87",
            "reading": "43.5",
            "volume": "3387.12",
            "extra": "11.06"
        },
        {
            "id": "88",
            "reading": "44",
            "volume": "3442.67",
            "extra": "11.11"
        },
        {
            "id": "89",
            "reading": "44.5",
            "volume": "3498.44",
            "extra": "11.15"
        },
        {
            "id": "90",
            "reading": "45",
            "volume": "3554.43",
            "extra": "11.2"
        },
        {
            "id": "91",
            "reading": "45.5",
            "volume": "3610.65",
            "extra": "11.24"
        },
        {
            "id": "92",
            "reading": "46",
            "volume": "3667.08",
            "extra": "11.29"
        },
        {
            "id": "93",
            "reading": "46.5",
            "volume": "3723.73",
            "extra": "11.33"
        },
        {
            "id": "94",
            "reading": "47",
            "volume": "3780.6",
            "extra": "11.37"
        },
        {
            "id": "95",
            "reading": "47.5",
            "volume": "3837.67 ",
            "extra": "11.41"
        },
        {
            "id": "96",
            "reading": "48",
            "volume": "3894.95",
            "extra": "11.46"
        },
        {
            "id": "97",
            "reading": "48.5",
            "volume": "3952.43",
            "extra": "11.5"
        },
        {
            "id": "98",
            "reading": "491",
            "volume": "4010.12",
            "extra": "11.54"
        },
        {
            "id": "99",
            "reading": "49.5",
            "volume": "4068.01",
            "extra": "11.58"
        },
        {
            "id": "100",
            "reading": "50",
            "volume": "4126.09",
            "extra": "11.62"
        },
        {
            "id": "101",
            "reading": "50.5",
            "volume": "4184.37",
            "extra": "11.66"
        },
        {
            "id": "102",
            "reading": "51",
            "volume": "4242.83",
            "extra": "11.69"
        },
        {
            "id": "103",
            "reading": "51.5",
            "volume": "4301.49",
            "extra": "11.73"
        },
        {
            "id": "104",
            "reading": "52",
            "volume": "4360.33",
            "extra": "11.77"
        },
        {
            "id": "105",
            "reading": "52.5",
            "volume": "4419.36",
            "extra": "11.81"
        },
        {
            "id": "106",
            "reading": "53",
            "volume": "4478.57",
            "extra": "11.84"
        },
        {
            "id": "107",
            "reading": "53.5",
            "volume": "4537.95",
            "extra": "11.88"
        },
        {
            "id": "108",
            "reading": "54 ",
            "volume": "4597.52",
            "extra": "11.91"
        },
        {
            "id": "109",
            "reading": "54.5",
            "volume": "4657.25",
            "extra": "11.95"
        },
        {
            "id": "110",
            "reading": "55",
            "volume": "4717.16",
            "extra": "11.98"
        },
        {
            "id": "111",
            "reading": "55.5",
            "volume": "4777.24",
            "extra": "12.02"
        },
        {
            "id": "112",
            "reading": "56",
            "volume": "4837.48",
            "extra": "12.05"
        },
        {
            "id": "113",
            "reading": "56.5",
            "volume": "4897.89",
            "extra": "12.08"
        },
        {
            "id": "114",
            "reading": "57",
            "volume": "4958.46",
            "extra": "12.11"
        },
        {
            "id": "115",
            "reading": "57.5",
            "volume": "5019.2",
            "extra": "12.15"
        },
        {
            "id": "116",
            "reading": "58",
            "volume": "5080.09",
            "extra": "12.18"
        },
        {
            "id": "117",
            "reading": "58.5",
            "volume": "5141.13",
            "extra": "12.21"
        },
        {
            "id": "118",
            "reading": "59",
            "volume": "5202.33",
            "extra": "12.24"
        },
        {
            "id": "119",
            "reading": "59.5",
            "volume": "5263.68",
            "extra": "12.27"
        },
        {
            "id": "120",
            "reading": "60",
            "volume": "5325.18",
            "extra": "12.3"
        }
    ]
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
}).config(function($stateProvider, $urlRouterProvider){
    var states = [
    {
    name: 'main',
    url: '/',
    template: `
    <div>
        <div class="head-sec">
            <div class="header">
                E-Bunk Calculator - V.1
            </div>
        </div>
        <div class="main-cal">
            <div class="item-cal" ng-click="takeMe('dip')">
                <div class="item-cal-img"><img src="../icons/depth2.png"></div>
                <div>Dip</div>
            </div>
            <div class="item-cal" ng-click="takeMe('denom')">
                <div class="item-cal-img"><img src="../icons/denom.png"></div>
                <div>Denomination</div>
            </div>
        </div>
    </div>
    `,
    controller:function($scope,$state){
        $scope.takeMe = (route) =>{
            $state.go(route);   
        }
    }
    },
    {
    name: 'dip',
    url: '/dip',
    template: '<dip-buddy></dip-buddy>'
    },
    {
        name: 'denom',
        url: '/denom',
        template: '<calculate-buddy></calculate-buddy>'
        }
    ];
    states.forEach((state) => $stateProvider.state(state));
    $urlRouterProvider.otherwise('/');
}).directive("dipBuddy",function(){
    return{
        restrict:"AE",
        template:`<div class="head-sec">
                    <div class="go-back" ng-click="goBack()">Back</div>
                    <div class="header">Dip</div>
                </div>
                <div class="body-sec dip-sec">
                    <input type='number' ng-model='dipValue' placeholder='Enter Dip'>
                    <button class="dip-button" ng-click='getDip()'>Calculate</button>
                </div>
                <div class="result-sec">
                <lable>Liters:</label>
                    <span ng-if="result > 1000" style="color:green;">{{result}}</span>
                    <span ng-if="result <= 1000" style="color:red;">{{result}}</span>
                </div>
                `,
        controller:function($scope,$state){
            $scope.result = 0;
            $scope.getDip = () =>{
                var dipTable = [
                    {
                        "id": "1",
                        "reading": "0.5",
                        "volume": "4.47",
                        "extra": "0 "
                    },
                    {
                        "id": "2",
                        "reading": "1",
                        "volume": "12.64",
                        "extra": "1.63"
                    },
                    {
                        "id": "3",
                        "reading": "1.5",
                        "volume": "23.21",
                        "extra": "2.11"
                    },
                    {
                        "id": "4",
                        "reading": "2",
                        "volume": "35.72",
                        "extra": "2.5"
                    },
                    {
                        "id": "5",
                        "reading": "2.5",
                        "volume": "49.88",
                        "extra": "2.83"
                    },
                    {
                        "id": "6",
                        "reading": "3",
                        "volume": "65.52",
                        "extra": "3.13"
                    },
                    {
                        "id": "7",
                        "reading": "3.5",
                        "volume": "82.5",
                        "extra": "3.4"
                    },
                    {
                        "id": "8",
                        "reading": "4",
                        "volume": "100.73",
                        "extra": "3.65"
                    },
                    {
                        "id": "9",
                        "reading": "4.5",
                        "volume": "120.1",
                        "extra": "3.87"
                    },
                    {
                        "id": "10",
                        "reading": "5",
                        "volume": "140.56",
                        "extra": "4.09"
                    },
                    {
                        "id": "11",
                        "reading": "5.5",
                        "volume": "162.03",
                        "extra": "4.29"
                    },
                    {
                        "id": "12",
                        "reading": "6",
                        "volume": "184.49",
                        "extra": "4.49"
                    },
                    {
                        "id": "13",
                        "reading": "6.5",
                        "volume": "207.86",
                        "extra": "4.67"
                    },
                    {
                        "id": "14",
                        "reading": "7",
                        "volume": "232.12",
                        "extra": "4.85"
                    },
                    {
                        "id": "15",
                        "reading": "7.5",
                        "volume": "257.24",
                        "extra": "5.02"
                    },
                    {
                        "id": "16",
                        "reading": "8",
                        "volume": "283.17",
                        "extra": "5.19"
                    },
                    {
                        "id": "17",
                        "reading": "8.5",
                        "volume": "309.88",
                        "extra": "5.34"
                    },
                    {
                        "id": "18",
                        "reading": "9",
                        "volume": "337.36",
                        "extra": "5.5"
                    },
                    {
                        "id": "19",
                        "reading": "9.5",
                        "volume": "365.58",
                        "extra": "5.64"
                    },
                    {
                        "id": "20",
                        "reading": "10",
                        "volume": "394.52",
                        "extra": "5.79 "
                    },
                    {
                        "id": "21",
                        "reading": "10.5",
                        "volume": "424.14",
                        "extra": "5.92"
                    },
                    {
                        "id": "22",
                        "reading": "11",
                        "volume": "454.44",
                        "extra": "6.06"
                    },
                    {
                        "id": "23",
                        "reading": "11.5",
                        "volume": "485.4",
                        "extra": "6.19"
                    },
                    {
                        "id": "24",
                        "reading": "12",
                        "volume": "516.99",
                        "extra": "6.32"
                    },
                    {
                        "id": "25",
                        "reading": "12.5",
                        "volume": "549.21",
                        "extra": "6.44"
                    },
                    {
                        "id": "26",
                        "reading": "13",
                        "volume": "582.04",
                        "extra": "6.57"
                    },
                    {
                        "id": "27",
                        "reading": "13.5",
                        "volume": "615.45",
                        "extra": "6.68"
                    },
                    {
                        "id": "28",
                        "reading": "14",
                        "volume": "649.45",
                        "extra": "6.8"
                    },
                    {
                        "id": "29",
                        "reading": "14.5",
                        "volume": "684.01 ",
                        "extra": "6.91"
                    },
                    {
                        "id": "30",
                        "reading": "15",
                        "volume": "719.13 ",
                        "extra": "7.02"
                    },
                    {
                        "id": "31",
                        "reading": "15.5",
                        "volume": "754.79",
                        "extra": "7.13"
                    },
                    {
                        "id": "32",
                        "reading": "16",
                        "volume": "790.98",
                        "extra": "7.24 "
                    },
                    {
                        "id": "33",
                        "reading": "16.5",
                        "volume": "827.69",
                        "extra": "7.34"
                    },
                    {
                        "id": "34",
                        "reading": "17",
                        "volume": "864.91",
                        "extra": "7.44"
                    },
                    {
                        "id": "35",
                        "reading": "17.5",
                        "volume": "902.62",
                        "extra": "7.54"
                    },
                    {
                        "id": "36",
                        "reading": "18",
                        "volume": "940.83",
                        "extra": "7.64"
                    },
                    {
                        "id": "37",
                        "reading": "18.5",
                        "volume": "979.52",
                        "extra": "7.74"
                    },
                    {
                        "id": "38",
                        "reading": "19",
                        "volume": "1018.69",
                        "extra": "7.83"
                    },
                    {
                        "id": "39",
                        "reading": "19.5",
                        "volume": "1058.31",
                        "extra": "7.92"
                    },
                    {
                        "id": "40",
                        "reading": "20",
                        "volume": "1098.4",
                        "extra": "8.02"
                    },
                    {
                        "id": "41",
                        "reading": "20.5",
                        "volume": "1138.93",
                        "extra": "8.11"
                    },
                    {
                        "id": "42",
                        "reading": "21",
                        "volume": "1179.9",
                        "extra": "8.19"
                    },
                    {
                        "id": "43",
                        "reading": "21.5",
                        "volume": "1221.3",
                        "extra": "8.28"
                    },
                    {
                        "id": "44",
                        "reading": "22",
                        "volume": "1263.13",
                        "extra": "8.37 "
                    },
                    {
                        "id": "45",
                        "reading": "22.5",
                        "volume": "1305.38",
                        "extra": "8.45"
                    },
                    {
                        "id": "46",
                        "reading": "23",
                        "volume": "1348.04",
                        "extra": "8.53"
                    },
                    {
                        "id": "47",
                        "reading": "23.5",
                        "volume": "1391.1",
                        "extra": "8.61"
                    },
                    {
                        "id": "48",
                        "reading": "24",
                        "volume": "1434.57",
                        "extra": "8.69"
                    },
                    {
                        "id": "49",
                        "reading": "24.5",
                        "volume": "1478.43",
                        "extra": "8.77"
                    },
                    {
                        "id": "50",
                        "reading": "25",
                        "volume": "1552.67",
                        "extra": "14.85"
                    },
                    {
                        "id": "51",
                        "reading": "25.5",
                        "volume": "1567.29",
                        "extra": "2.92"
                    },
                    {
                        "id": "52",
                        "reading": "26",
                        "volume": "1612.29",
                        "extra": "9"
                    },
                    {
                        "id": "53",
                        "reading": "26.5",
                        "volume": "1657.66",
                        "extra": "9.07"
                    },
                    {
                        "id": "54",
                        "reading": "27",
                        "volume": "1703.4",
                        "extra": "9.15"
                    },
                    {
                        "id": "55",
                        "reading": "27.5",
                        "volume": "1749.49",
                        "extra": "9.22 "
                    },
                    {
                        "id": "56",
                        "reading": "28",
                        "volume": "1795.94",
                        "extra": "9.29"
                    },
                    {
                        "id": "57",
                        "reading": "28.5",
                        "volume": "1842.73",
                        "extra": "9.36"
                    },
                    {
                        "id": "58",
                        "reading": "29",
                        "volume": "1889.87",
                        "extra": "9.43 "
                    },
                    {
                        "id": "59",
                        "reading": "29.5",
                        "volume": "1937.35",
                        "extra": "9.5"
                    },
                    {
                        "id": "60",
                        "reading": "30",
                        "volume": "1985.16",
                        "extra": "9.56"
                    },
                    {
                        "id": "61",
                        "reading": "30.5",
                        "volume": "2033.3",
                        "extra": "9.63"
                    },
                    {
                        "id": "62",
                        "reading": "31",
                        "volume": "2081.76",
                        "extra": "9.69"
                    },
                    {
                        "id": "63",
                        "reading": "31.5",
                        "volume": "2130.55",
                        "extra": "9.76"
                    },
                    {
                        "id": "64",
                        "reading": "32",
                        "volume": "2179.65",
                        "extra": "9.82"
                    },
                    {
                        "id": "65",
                        "reading": "32.5",
                        "volume": "2229.06",
                        "extra": "9.88"
                    },
                    {
                        "id": "66",
                        "reading": "33",
                        "volume": "2278.78",
                        "extra": "9.94"
                    },
                    {
                        "id": "67",
                        "reading": "33.5",
                        "volume": "2328.8",
                        "extra": "10"
                    },
                    {
                        "id": "68",
                        "reading": "34",
                        "volume": "2379.12",
                        "extra": "10.06"
                    },
                    {
                        "id": "69",
                        "reading": "34.5",
                        "volume": "2429.74",
                        "extra": "10.12"
                    },
                    {
                        "id": "70",
                        "reading": "35",
                        "volume": "2480.65 ",
                        "extra": "10.18 "
                    },
                    {
                        "id": "71",
                        "reading": "35.5",
                        "volume": "2531.84",
                        "extra": "10.24"
                    },
                    {
                        "id": "72",
                        "reading": "36",
                        "volume": "2583.32",
                        "extra": "10.3"
                    },
                    {
                        "id": "73",
                        "reading": "36.5",
                        "volume": "2635.08",
                        "extra": "10.35"
                    },
                    {
                        "id": "74",
                        "reading": "37",
                        "volume": "2687.12",
                        "extra": "10.41"
                    },
                    {
                        "id": "75",
                        "reading": "37.5",
                        "volume": "2739.42 ",
                        "extra": "10.46"
                    },
                    {
                        "id": "76",
                        "reading": "38",
                        "volume": "2792",
                        "extra": "10.52"
                    },
                    {
                        "id": "77",
                        "reading": "38.5",
                        "volume": "2844.84",
                        "extra": "10.57"
                    },
                    {
                        "id": "78",
                        "reading": "39",
                        "volume": "2897.95",
                        "extra": "10.62"
                    },
                    {
                        "id": "79",
                        "reading": "39.50 ",
                        "volume": "2951.31",
                        "extra": "10.67"
                    },
                    {
                        "id": "80",
                        "reading": "40",
                        "volume": "3004.92",
                        "extra": "10.72"
                    },
                    {
                        "id": "81",
                        "reading": "40.50 ",
                        "volume": "3058.79",
                        "extra": "10.77"
                    },
                    {
                        "id": "82",
                        "reading": "41",
                        "volume": "3112.91",
                        "extra": "10.82"
                    },
                    {
                        "id": "83",
                        "reading": "41.5",
                        "volume": "3167.28",
                        "extra": "10.87"
                    },
                    {
                        "id": "84",
                        "reading": "42",
                        "volume": "3221.88",
                        "extra": "10.92 "
                    },
                    {
                        "id": "85",
                        "reading": "42.5",
                        "volume": "3276.73",
                        "extra": "10.97"
                    },
                    {
                        "id": "86",
                        "reading": "43",
                        "volume": "3331.81",
                        "extra": "11.02"
                    },
                    {
                        "id": "87",
                        "reading": "43.5",
                        "volume": "3387.12",
                        "extra": "11.06"
                    },
                    {
                        "id": "88",
                        "reading": "44",
                        "volume": "3442.67",
                        "extra": "11.11"
                    },
                    {
                        "id": "89",
                        "reading": "44.5",
                        "volume": "3498.44",
                        "extra": "11.15"
                    },
                    {
                        "id": "90",
                        "reading": "45",
                        "volume": "3554.43",
                        "extra": "11.2"
                    },
                    {
                        "id": "91",
                        "reading": "45.5",
                        "volume": "3610.65",
                        "extra": "11.24"
                    },
                    {
                        "id": "92",
                        "reading": "46",
                        "volume": "3667.08",
                        "extra": "11.29"
                    },
                    {
                        "id": "93",
                        "reading": "46.5",
                        "volume": "3723.73",
                        "extra": "11.33"
                    },
                    {
                        "id": "94",
                        "reading": "47",
                        "volume": "3780.6",
                        "extra": "11.37"
                    },
                    {
                        "id": "95",
                        "reading": "47.5",
                        "volume": "3837.67 ",
                        "extra": "11.41"
                    },
                    {
                        "id": "96",
                        "reading": "48",
                        "volume": "3894.95",
                        "extra": "11.46"
                    },
                    {
                        "id": "97",
                        "reading": "48.5",
                        "volume": "3952.43",
                        "extra": "11.5"
                    },
                    {
                        "id": "98",
                        "reading": "491",
                        "volume": "4010.12",
                        "extra": "11.54"
                    },
                    {
                        "id": "99",
                        "reading": "49.5",
                        "volume": "4068.01",
                        "extra": "11.58"
                    },
                    {
                        "id": "100",
                        "reading": "50",
                        "volume": "4126.09",
                        "extra": "11.62"
                    },
                    {
                        "id": "101",
                        "reading": "50.5",
                        "volume": "4184.37",
                        "extra": "11.66"
                    },
                    {
                        "id": "102",
                        "reading": "51",
                        "volume": "4242.83",
                        "extra": "11.69"
                    },
                    {
                        "id": "103",
                        "reading": "51.5",
                        "volume": "4301.49",
                        "extra": "11.73"
                    },
                    {
                        "id": "104",
                        "reading": "52",
                        "volume": "4360.33",
                        "extra": "11.77"
                    },
                    {
                        "id": "105",
                        "reading": "52.5",
                        "volume": "4419.36",
                        "extra": "11.81"
                    },
                    {
                        "id": "106",
                        "reading": "53",
                        "volume": "4478.57",
                        "extra": "11.84"
                    },
                    {
                        "id": "107",
                        "reading": "53.5",
                        "volume": "4537.95",
                        "extra": "11.88"
                    },
                    {
                        "id": "108",
                        "reading": "54 ",
                        "volume": "4597.52",
                        "extra": "11.91"
                    },
                    {
                        "id": "109",
                        "reading": "54.5",
                        "volume": "4657.25",
                        "extra": "11.95"
                    },
                    {
                        "id": "110",
                        "reading": "55",
                        "volume": "4717.16",
                        "extra": "11.98"
                    },
                    {
                        "id": "111",
                        "reading": "55.5",
                        "volume": "4777.24",
                        "extra": "12.02"
                    },
                    {
                        "id": "112",
                        "reading": "56",
                        "volume": "4837.48",
                        "extra": "12.05"
                    },
                    {
                        "id": "113",
                        "reading": "56.5",
                        "volume": "4897.89",
                        "extra": "12.08"
                    },
                    {
                        "id": "114",
                        "reading": "57",
                        "volume": "4958.46",
                        "extra": "12.11"
                    },
                    {
                        "id": "115",
                        "reading": "57.5",
                        "volume": "5019.2",
                        "extra": "12.15"
                    },
                    {
                        "id": "116",
                        "reading": "58",
                        "volume": "5080.09",
                        "extra": "12.18"
                    },
                    {
                        "id": "117",
                        "reading": "58.5",
                        "volume": "5141.13",
                        "extra": "12.21"
                    },
                    {
                        "id": "118",
                        "reading": "59",
                        "volume": "5202.33",
                        "extra": "12.24"
                    },
                    {
                        "id": "119",
                        "reading": "59.5",
                        "volume": "5263.68",
                        "extra": "12.27"
                    },
                    {
                        "id": "120",
                        "reading": "60",
                        "volume": "5325.18",
                        "extra": "12.3"
                    }
                ]
                var cDip = Number($scope.dipValue);
                var nearNumber = cDip- (cDip % 0.5);
                var extra = (cDip*10) % 5;
                var value = dipTable.filter(o =>{
                    return Number(o.reading) == nearNumber;
                })
                if(value.length > 0){
                    $scope.result = (Number(Number(value[0].volume) + extra*Number(value[0].extra))).toFixed(2);
                }   
            }
            $scope.goBack = () =>{
                $state.go("main")
            }
        }
    }
})
