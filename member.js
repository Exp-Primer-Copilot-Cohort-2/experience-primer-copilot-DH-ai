function skillsMember() {
    return {
        name: 'skillsMember',
        restrict: 'E',
        templateUrl: 'app/member/skills-member.html',
        scope: {
            member: '=',
            skill: '='
        },
        controller: function ($scope) {
            $scope.member.skills = $scope.member.skills || [];
            $scope.addSkill = function () {
                $scope.member.skills.push($scope.skill);
            };
        }
    };
}