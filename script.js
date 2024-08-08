// @author Henry Glenn

// Declare application-wide constants
const compatibleDeviceContent = document.getElementById(
    "compatible-device-content",
);
const incompatibleDeviceContent = document.getElementById(
    "incompatible-device-content",
);
const bottomBackgroundBuffer = document.getElementById(
    "bottom-background-buffer",
);
const topBackgroundBuffer = document.getElementById("top-background-buffer");
const compassArrow = document.getElementById("compass-arrow");
const latitudeDisplay = document.getElementById("latitude");
const longitudeDisplay = document.getElementById("longitude");
const headingDisplay = document.getElementById("heading");
const distanceDisplay = document.getElementById("distance");
const locationDropdown = document.getElementById("location-select");
const refreshTimer = document.getElementById("refresh-timer");
const isCompatible =
    "geolocation" in navigator && window.DeviceOrientationEvent !== undefined;
const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) !== null &&
    navigator.userAgent.match(/AppleWebKit/) !== null;
const isAndroid = navigator.userAgent.match(/(Android)/) !== null;
// Declare and define trackable locations
const locations = [
    [
        "Marlatt Hall",
        [
            [39.1924041500292, -96.58810618021606],
            "https://th.bing.com/th/id/R.489964d50d1c1af501d354100ec286fa?rik=Qxew17DYRUwvjg&riu=http%3a%2f%2fhousing.k-state.edu%2fimages%2fliving-options%2fmarlatt%2fmarlatt-1.jpg&ehk=s7md3Tpm%2fMaaTVipVnEFke9WzmmGTm5Re%2bg8Z3fRsSw%3d&risl=&pid=ImgRaw&r=0",
        ],
    ],
    [
        "Goodnow Hall",
        [
            [39.19245128961732, -96.58635751670676],
            "https://housing.k-state.edu/images/about_us/GoodnowSm.png",
        ],
    ],
    [
        "Wefald Hall",
        [
            [39.191826687508595, -96.58583291765396],
            "https://www.bartlettwest.com/sites/default/files/2017-06/IMG_4285_0.JPG",
        ],
    ],
    [
        "Kramer Dining Center",
        [
            [39.19191507493669, -96.58708739364977],
            "https://www.broaddusconstruction.com/wp-content/uploads/2020/05/T16_3409.jpg",
        ],
    ],
    [
        "Engineering Hall",
        [
            [39.1909371314614, -96.58416849424121],
            "https://th.bing.com/th/id/R.3d86475ebe5a6be4d7e453c22f222010?rik=VmsVffOWrV0eWw&riu=http%3a%2f%2fwww.randybraley.com%2fwp-content%2fuploads%2f2016%2f10%2fksu2.jpg&ehk=5Pf1QMzWSYFaam0iq5shhTD0WlP7iD%2bcmluhPc04WEw%3d&risl=1&pid=ImgRaw&r=0",
        ],
    ],
    [
        "Durland Hall",
        [
            [39.190157044564394, -96.58444253759109],
            "https://stonedetails.com/wp-content/uploads/2019/03/contact-stone-details-bg-2.jpg",
        ],
    ],
    [
        "Calvin Hall",
        [
            [39.18711877291759, -96.58163397144932],
            "https://fastly.4sqi.net/img/general/600x600/12699647_r55tReIx2D_4IrY0Xkq7P-U5DgxhPW8GiG86ZQJClhI.jpg",
        ],
    ],
    [
        "Holton Hall",
        [
            [39.18993218836137, -96.5800629374026],
            "https://www.k-state.edu/maps/buildings/S/s.jpg",
        ],
    ],
    [
        "Ahearn Gymnasium",
        [
            [39.189080269048546, -96.58483911969557],
            "https://www.k-state.edu/maps/buildings/AFH/afh.jpg",
        ],
    ],
    [
        "Seaton Hall",
        [
            [39.1891366958488, -96.58262773759176],
            "https://www.k-state.edu/maps/buildings/S/s.jpg",
        ],
    ],
    [
        "Ward Hall",
        [
            [39.191619430207446, -96.58303725278611],
            "https://www.k-state.edu/maps/buildings/WD/wd-s.jpg",
        ],
    ],
    [
        "Derby Dining Center",
        [
            [39.194176115062575, -96.5776082249935],
            "https://servco-stl.com/wp-content/uploads/2022/11/IMG_9945E-scaled.jpg",
        ],
    ],
    [
        "Eisenhower Hall",
        [
            [39.18950046950845, -96.58056088700222],
            "https://th.bing.com/th/id/OIP.FEZQyXob1jXQaKsyDDG1KwHaE6?rs=1&pid=ImgDetMain",
        ],
    ],
    [
        "College of Business",
        [
            [39.189451025268184, -96.57742222016529],
            "https://images.squarespace-cdn.com/content/v1/570815def8baf3b9cbdcc796/1575294844099-R8I9H7KASV84F47Y2E6D/KSU_Business_School-28-edit.jpg?format=1000w",
        ],
    ],
    [
        "Justin Hall",
        [
            [39.19029157270066, -96.57793257259314],
            "https://images.squarespace-cdn.com/content/v1/570815def8baf3b9cbdcc796/1575665640041-IUZYNKD3992IQPUH1XL8/Justin-Hall-22.jpg",
        ],
    ],
    [
        "K-State Student Union",
        [
            [39.1882445749043, -96.58244919059908],
            "https://www.bbnarchitects.com/wordpress/wp-content/uploads/2017/08/Thumbnail-Image-2-1024x1024.jpg",
        ],
    ],
    [
        "Hale Library",
        [
            [39.190674534360994, -96.58063136419415],
            "https://www.k-state.edu/media/images/.private_ldp/a93409/production/master/9c34a7cb-655c-49bb-9631-abbbf66315ed.jpg",
        ],
    ],
    [
        "Cardwell Hall",
        [
            [39.19246930695406, -96.5820348329707],
            "https://gray-wibw-prod.cdn.arcpublishing.com/resizer/-y177eVevzM1wJ9UjCbIIJpq1HA=/1200x675/smart/cloudfront-us-east-1.images.arcpublishing.com/gray/GMF22M3TIFA73GYT2SSKGPW7SM.jpg",
        ],
    ],
    [
        "Anderson Hall",
        [
            [39.18860418625856, -96.58099055274477],
            "https://www.bestmastersprograms.org/wp-content/uploads/2015/01/Kansas-State-U-Building.jpg",
        ],
    ],
    [
        "College of Architecture, Planning & Design",
        [
            [39.18997235117392, -96.58177983266198],
            "https://d3roppooboxrdw.cloudfront.net/work-images/1414_KSU/2017-11-30_Tims-Initial-Images/_xxl/1414_KSU_Round1-2-8.jpg?mtime=20171130101052",
        ],
    ],
    [
        "Willard Hall",
        [
            [39.19144234679258, -96.58018426376265],
            "https://thumbs.dreamstime.com/b/willard-hall-mark-chapman-gallery-campus-kansas-state-university-manhatten-ks-usa-november-268884825.jpg",
        ],
    ],
];

const debug = false;

// Sort the locations in alphabetical order for user viewing pleasure
locations.sort(function (location1, location2) {
    var locationName1 = location1[0].toUpperCase(); // Ignore case
    var locationName2 = location2[0].toUpperCase(); // Ignore case
    if (locationName1 < locationName2) {
        return -1;
    }
    if (locationName1 > locationName2) {
        return 1;
    }
    return 0;
});

// Declare appliction class
class App {
    constructor() {
        // Declare class variables
        this.timer;
        this.timerSeconds;
        this.userLocation;
        this.destinationLocation;
        this.geoLocationOptions = {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 0,
        };

        // Display compass if device is compatible
        if (isCompatible && (isIOS || isAndroid || debug)) {
            // Populate destination selection drowdown with predefined location names and values
            this.populateDropdown(locationDropdown, locations);

            // Attach event listeners
            locationDropdown.addEventListener("click", () => {
                this.requestLocationAndOrientation();
            });
            locationDropdown.addEventListener("change", () => {
                this.startRoute();
            });

            // Reveal main app html
            this.show(compatibleDeviceContent);
        }
        // Display error if device is incompatible
        else {
            // Reveal error html
            this.show(incompatibleDeviceContent);
        }
    }

    startRoute() {
        // Retrieve destination data
        var data =
            locationDropdown.options[locationDropdown.selectedIndex].dataValue;

        // Set destination
        this.destinationLocation = data[0];

        // Set new background
        this.setBackground(data[1]);

        // Listen for change in location events
        navigator.geolocation.watchPosition(
            (position) => {
                this.handleGeoLocation(position);
            },
            (error) => {
                this.handleGeoLocationError(error);
            },
            this.geoLocationOptions,
        );

        // If the user's location is already known then update the ui to show the new destination distance
        if (this.isUserLocated) {
            this.updateDestinationDistanceDisplay(
                this.userLocation,
                this.destinationLocation,
            );
        }
    }

    setBackground(url) {
        // Declare an image to hold the background image
        var image = new Image();

        // Transition to the new background image only after it has loaded
        image.onload = () => {
            if (
                topBackgroundBuffer.style.opacity == "" ||
                topBackgroundBuffer.style.opacity == "0"
            ) {
                topBackgroundBuffer.src = url;
                topBackgroundBuffer.style.opacity = "1";
            } else {
                bottomBackgroundBuffer.src = url;
                topBackgroundBuffer.style.opacity = "0";
            }
        };

        // Set the source of the new background image
        image.src = url;
    }

    show(element) {
        element.style.display = "flex";
    }

    toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }

    normalizeDegrees(degrees) {
        return (degrees + 360) % 360;
    }

    decimalToStandardCoordinate(decimal) {
        var degrees = Math.floor(decimal);
        var minutesDecimal = (decimal - degrees) * 60;
        var minutes = Math.floor(minutesDecimal);
        var seconds = (minutesDecimal - minutes) * 60;
        return degrees + "°" + minutes + "'" + seconds.toFixed(2) + '"';
    }

    decimalToStandardLatitude(latitude) {
        var latitudeDirection = latitude >= 0 ? "N" : "S";
        return (
            this.decimalToStandardCoordinate(Math.abs(latitude)) +
            latitudeDirection
        );
    }

    decimalToStandardlLongitude(longitude) {
        var longitudeDirection = longitude >= 0 ? "E" : "W";
        return (
            this.decimalToStandardCoordinate(Math.abs(longitude)) +
            longitudeDirection
        );
    }

    startTimer() {
        // Start refresh timer
        this.timer = setInterval(() => {
            this.timerSeconds++;
            this.updateRefreshTimer();
        }, 1000);
    }

    resetTimer() {
        // Reset refresh timer
        clearInterval(this.timer);
        this.timerSeconds = 0;
        this.updateRefreshTimer();
    }

    updateRefreshTimer() {
        // Update ui to display the seconds since last refresh
        refreshTimer.textContent = `Location refreshed ${this.timerSeconds} seconds ago`;
    }

    getDistance(location1, location2) {
        // Split locations into their separate latitude and longitude values
        const [latitude1, longitude1] = location1;
        const [latitude2, longitude2] = location2;

        // Calculate the difference between the latitudes and longitudes then convert them to radians
        const deltaLatitude = this.toRadians(latitude2 - latitude1);
        const deltaLongitude = this.toRadians(longitude2 - longitude1);

        // Haversine formula from Wikipedia interperated by ChatGPT into JavaScript
        const radius = 6371000; // In meters
        const a =
            Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
            Math.cos(this.toRadians(latitude1)) *
                Math.cos(this.toRadians(latitude2)) *
                Math.sin(deltaLongitude / 2) *
                Math.sin(deltaLongitude / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return radius * c;
    }

    updateDestinationDistanceDisplay() {
        // Update ui to display the current destination distance estimate
        distanceDisplay.textContent = `~${Math.round(
            this.getDistance(this.userLocation, this.destinationLocation),
        )}m`;
    }

    requestLocationAndOrientation() {
        // If a destination is selected request orientaion permissions
        if (!this.isDestinationSelected) {
            // If in debug mode simulate compass by passing random valid heading values into handler
            if (debug) {
                setInterval(() => {
                    this.handleCompassHeading(Math.random() * 359 + 1);
                }, 1000);
            }
            // Else request orientaion permissions
            else {
                DeviceOrientationEvent.requestPermission()
                    .then((response) => {
                        // If access is granted then attach handler to device orientation event listener
                        if (response === "granted") {
                            window.addEventListener(
                                "deviceorientation",
                                (compass) => {
                                    this.handleCompassHeading(compass);
                                },
                                true,
                            );
                        }
                        // Else alert user that permission has been denied
                        else {
                            alert("Permission denied");
                        }
                    })
                    .catch((error) => {
                        alert(error);
                    });
            }
        }
    }

    populateDropdown(dropdown, values) {
        // For each value provided add an option element to the dropdown selection menu
        values.forEach((value) => {
            // Create a new option html element
            var option = document.createElement("option");

            // Set the option element's display text and hidden value
            option.dataValue = value[1];
            option.textContent = value[0];

            // Add the option element to the dropdown as a child element
            dropdown.appendChild(option);
        });
    }

    getDestinationHeading(heading) {
        const deltaLatitude = this.toRadians(
            this.destinationLocation[0] - this.userLocation[0],
        );
        const deltaLongitude = this.toRadians(
            this.destinationLocation[1] - this.userLocation[1],
        );

        var theta = this.toDegrees(Math.atan2(deltaLongitude, deltaLatitude));

        // Fail safe to prevent heading from going below 0
        var destinationHeading = this.normalizeDegrees(heading - theta);

        return destinationHeading;
    }

    handleGeoLocationError(error) {
        // If error code indicates that the location permitions have been denied then alert the user
        if (error.code === error.PERMISSION_DENIED) {
            // If in debug mode alert user with a generic error message
            if (debug) {
                alert("Permission to use Geolocation was denied.");
            }
            // If the device operating system is IOS then refer user to the settings app to allow permission
            else if (isIOS) {
                alert(
                    "Permission to access Geolocation was denied. To allow access go to Settings > " +
                        "Screen Time > Content & Privacy Restrictions > Location Services.",
                );
            }
            // If the device operating system is Android then alert user with a generic error message
            else if (isAndroid) {
                alert("Permission to use Geolocation was denied.");
            }
        }
        // If error code indicates that the location services are unavavilable alert user with a generic error message
        else if (error.code === error.POSITION_UNAVAILABLE) {
            alert(
                "Geolocation is unavailable at this time or is not supported by this device.",
            );
        }
        // If error code indicates that the a location request has timed out then log quietly for debugging purposes
        else if (error.code === error.TIMEOUT) {
            console.log("Geolocation request timed out.");
        }
    }

    handleCompassHeading(compass) {
        var heading;

        // If in debug mode set heading directly to input value
        if (debug) {
            heading = compass;
        }
        // If the device operating system is IOS then extract heading from the apple webkit
        else if (isIOS) {
            heading = compass.webkitCompassHeading;
        }
        // If the device operating system is Android then extract heading using the alpth getter method
        else if (isAndroid) {
            heading = 180 - compass.alpha;
        }

        // If the user's location is known and a desination has been selected then orient the compass arrow toward the destination
        if (this.isDestinationSelected && this.isUserLocated) {
            // Update ui with current heading rounded to a whole number
            headingDisplay.innerHTML = `${Math.round(heading)}°`;

            // Get destination heading then orient compass arrow in that direction
            var destinationHeading = this.getDestinationHeading(heading);
            compassArrow.style.transform = `translate(-50%, -50%) rotate(${-destinationHeading}deg)`;
        }
    }

    handleGeoLocation(position) {
        // Update ui with current user's latitude longitude values
        latitudeDisplay.innerHTML = this.decimalToStandardLatitude(
            position.coords.latitude,
        );
        longitudeDisplay.innerHTML = this.decimalToStandardlLongitude(
            position.coords.longitude,
        );

        // Update user location variable with current latitude longitude values
        this.userLocation = [
            position.coords.latitude,
            position.coords.longitude,
        ];

        // Update ui with current estimated distance to destination
        this.updateDestinationDistanceDisplay();

        // Reset and start location refresh timer
        this.resetTimer();
        this.startTimer();
    }

    get isDestinationSelected() {
        // Test whether or not a destination has been selected by the user
        return this.destinationLocation !== undefined;
    }

    get isUserLocated() {
        // Test whether the user's location is known
        return this.userLocation !== undefined;
    }
}

// Run client-side application backend
var app = new App();
