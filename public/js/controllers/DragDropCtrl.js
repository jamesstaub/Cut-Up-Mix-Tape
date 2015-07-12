angular.module("cutupApp").controller("DragDropController", function($scope) {

    $scope.lists = [
  [
    [
      {
        "label": "Item 10"
      },
      {
        "label": "Item 11"
      },
      {
        "label": "Item 12"
      },
      {
        "label": "Item 13"
      },
      {
        "label": "Item 14"
      },
      {
        "label": "Item 15"
      },
      {
        "label": "Item 16"
      }
    ],
    [
      {
        "label": "Item 17"
      },
      {
        "label": "Item 18"
      },
      {
        "label": "Item 19"
      },
      {
        "label": "Item 20"
      },
      {
        "label": "Item 21"
      },
      {
        "label": "Item 22"
      },
      {
        "label": "Item 23"
      }
    ]
  ],
  [
    [
      {
        "label": "Item 24"
      },
      {
        "label": "Item 25"
      },
      {
        "label": "Item 26"
      },
      {
        "label": "Item 27"
      },
      {
        "label": "Item 28"
      },
      {
        "label": "Item 29"
      },
      {
        "label": "Item 30"
      }
    ],
    [
      {
        "label": "Item 31"
      },
      {
        "label": "Item 32"
      },
      {
        "label": "Item 33"
      },
      {
        "label": "Item 34"
      },
      {
        "label": "Item 35"
      },
      {
        "label": "Item 36"
      },
      {
        "label": "Item 37"
      }
    ]
  ],
  [
    [
      {
        "label": "Item 38"
      },
      {
        "label": "Item 39"
      },
      {
        "label": "Item 40"
      },
      {
        "label": "Item 41"
      },
      {
        "label": "Item 42"
      },
      {
        "label": "Item 43"
      },
      {
        "label": "Item 44"
      }
    ],
    [
      {
        "label": "Item 45"
      },
      {
        "label": "Item 46"
      },
      {
        "label": "Item 47"
      },
      {
        "label": "Item 48"
      },
      {
        "label": "Item 49"
      },
      {
        "label": "Item 50"
      },
      {
        "label": "Item 51"
      }
    ]
  ]
];



    // Model to JSON for demo purpose
    $scope.$watch('lists', function(lists) {
        $scope.modelAsJson = angular.toJson(lists, true);
    }, true);

});
