
angular.module('fuluchii.workflowChecklist', [])

  .directive('workflow', function() {

    return {
      restrict: 'EAC',
      template: '<div class="workflow-bar"><li ng-repeat="item in workflow_stack"><a ng-class="{green:item.state==1,red:item.state==0}" class="bar-item"  ng-click="select_tab($index)"></a>  <div ng-hide="$index == workflow_stack.length-1 " class="bar-line"></div></li>  </div>    </div><ul class="workf-list"><li ng-class="{Hide:selected_tab_index!=$index}" ng-repeat="item in workflow_stack" class="work-item"><div class="work-item-title Title">{{item.title}}</div><div class="item-con"><ul class="item-checklist"><li ng-repeat="step in item.steps" class="item-checkitem"><input  type="checkbox" class="item-check" ng-model="item.stepmap[step]" ng-checked="update()"><label  ng-class="{checkedlabel:item.stepmap[step]}">{{step}}</label></li>        </ul></div></li></ul>',
      scope: {_workflow:'@workflowStack'},
      compile: function compile(tElement, tAttrs, transclude) {
        return function postLink(scope, iElement, iAttrs, controller) { 
          // init
          scope.workflow_stack = JSON.parse(scope._workflow)
          angular.forEach(scope.workflow_stack,function(v,k){
            v.stepmap = {}
            angular.forEach(v.steps,function(item,key){
              v.stepmap[item] = false;
            })

          })

          scope.select_tab = function (index_tab){
            scope.selected_tab_index = index_tab;
            scope.select_item = scope.workflow_stack[index_tab]
          }

          scope.select_tab(0)

          scope.update = function(step){
            var checked_sum = 0;
            angular.forEach(scope.select_item.stepmap,function(v,k){
              if (v == true){
                checked_sum = checked_sum+1;
              }
            })
            if(checked_sum == scope.select_item.steps.length){
              scope.select_item.state = 1;
            }else{
              scope.select_item.state = 0;
            }
          } 
        };
      }
    };

  })
.derective
