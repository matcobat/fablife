/* Controllers */
(function() {
    'use strict';
    var app = angular.module('fablife');



    app.controller('homeController', function(
        $scope, Descriptor, Salus, Profile, ProfileDescriptor) {
        $scope.descriptors = Descriptor.query();
        $scope.profiles = Profile.query();
        $scope.parameters = null;
        $scope.options = {};

        $scope.search = function() {
            $scope.parameters = null;
        };

        $scope.openModal = function() {
            $scope.newProfile = null;
            if ($scope.options.selectedProfile) {
                angular.forEach($scope.profiles, function(profile) {
                    if (profile.slug == $scope.options.selectedProfile) {
                        $scope.newProfile = profile;
                    }
                });
                if ($scope.newProfile) {
                    $scope.save(true);
                }
            } else {
                $scope.newProfile = new Profile();
                $('#myModal').modal();
            }
        };

        $scope.save = function(isUpdate) {
            $scope.newProfile.descriptors = $scope.descriptors;
            $scope.newProfile.$save().then(function(response) {
                if (!isUpdate) {
                    $scope.profiles.push(response);
                    $scope.options.selectedProfile = response.slug;
                }

                if (isUpdate) {
                    $('#updateAlert').show();
                } else {
                    $('#myModal').modal('hide');
                    $('#creationAlert').show();
                }
            });

        };

        $scope.selectProfile = function() {
            ProfileDescriptor.query({ slug: $scope.options.selectedProfile }).$promise.then(function(descriptors) {
                angular.forEach($scope.descriptors, function(descriptor) {
                    angular.forEach(descriptors, function(profileDescriptor) {
                        if (descriptor.name == profileDescriptor.name) {
                            descriptor.value = profileDescriptor.value;
                            descriptor.slug = profileDescriptor.slug;
                        }
                    });
                });
            });
        };

        $scope.send = function() {
            Salus.save($scope.descriptors).$promise.then(function(response) {
                if (response.profileParameters) {
                    $scope.parameters = [];
                    for (var parameter in response.profileParameters) {
                        $scope.parameters.push(response.profileParameters[parameter]);
                    }
                    if ($scope.parameters.length == 0) {
                        $scope.parameters = null;
                    }
                }

            });
        };

    });


})();
