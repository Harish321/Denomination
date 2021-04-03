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
            <div class="load-amt-sec">
                <label for="loadAmt">Load Amount</label>
                <input type="number" id="loadAmt" ng-model="loadAmt">
            </div>
            <div class="denomination-sec">
                <div>  
                    <label for="2000">2000</label>
                    <input type="number" id="2000" ng-model="_2t" ng-change=updateTotalCash()>
                    <span>{{_2t*2000}}</span>
                </div>
                <div>  
                    <label for="500">500</label>
                    <input type="number" id="500" ng-model="_5h" ng-change=updateTotalCash()>
                    <span>{{_5h*500}}</span>
                </div>
                <div>  
                    <label for="200">200</label>
                    <input type="number" id="200" ng-model="_2h" ng-change=updateTotalCash()>
                    <span>{{_2h*200}}</span>
                </div>
                <div>  
                    <label for="100">100</label>
                    <input type="number" id="100" ng-model="_1h" ng-change=updateTotalCash()>
                    <span>{{_1h*100}}</span>
                </div>
                <div>  
                    <label for="50">50</label>
                    <input type="number" id="50" ng-model="_5e" ng-change=updateTotalCash()>
                    <span>{{_5e*50}}</span>
                </div>
                <div>  
                    <label for="20">20</label>
                    <input type="number" id="20" ng-model="_2e" ng-change=updateTotalCash()>
                    <span>{{_2e*20}}</span>
                </div>
                <div>  
                    <label for="10">10</label>
                    <input type="number" id="10" ng-model="_1e" ng-change=updateTotalCash()>
                    <span>{{_1e*10}}</span>
                </div>
            </div>
            <div class="other-accounts-sec">
                <div>
                    <lable>Total Cash</lable>
                    <span>{{totalCash | currency}}</span>
                </div>
                <div>
                    <label>DHR Account</lable>
                    <input type="number" ng-model="dhrAcc">
                </div>
                <div>
                    <label>Madam Account</lable>
                    <input type="number" ng-model="madamAcc">
                </div>
                <div>
                    <label>X-Sparsh Account</lable>
                    <input type="number" ng-model="xsparshAcc">
                </div>
            </div>
            <div class="result-sec">
                <div>
                    <lable>Total</label>
                    {{loadAmt-(totalCash+dhrAcc+madamAcc+xsparshAcc)}}
                </div>
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
}).controller("calculateBuddyCtrl",["$scope",function($scope){
    console.log("Inside controller");
    $scope.updateTotalCash = () =>{
        $scope.totalCash = ( Number(($scope._2t || 0)*2000) +  Number(($scope._5h || 0)*500) +  Number(($scope._2h || 0)*200) +  Number(($scope._1h || 0)*100) +  Number(($scope._5e || 0)*50) +  Number(($scope._2e || 0)*20) +  Number(($scope._1e || 0)*10))
        console.log(totalCash);
    }
}])