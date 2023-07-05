const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const ota = require('zigbee-herdsman-converters/lib/ota');
//const otaConverter = require ('/config/zigbee2mqtt/otaConverter');





const definition = [
    {
        zigbeeModel: ['LED_UNI'],
        model: 'LED_UNI',
        vendor: 'VIDA',
        description: 'My super CONTROLLER!',
        supports: 'on/off, brightness, RGBWW',
        toZigbee: [tz.light_onoff_brightness, tz.light_color_colortemp, tz.light_colortemp_startup],
        ota: ota.zigbeeOTA,
        // check work
        fromZigbee: [fz.on_off_skip_duplicate_transaction, fz.on_off, fz.brightness, fz.color_colortemp, fz.identify],
        exposes: [e.light_brightness_colortemp_colorhs([153, 500])],        
        // The configure method below is needed to make the device reports on/off state changes
        // when the device is controlled manually through the button on it.
        // The configure method will only be executed when the device pairs or when the configureKey
        // is incremented by one.
        meta: {configureKey: 1},
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl', 'lightingColorCtrl']);
            await reporting.onOff(endpoint);
            await reporting.brightness(endpoint);
        },
    },
    {
        fingerprint: [
            {type: 'Router', modelID: 'LED_UNI1', endpoints: [
                {ID: 1,  profileID: 260, deviceID: 258, inputClusters: [0, 3, 4, 5, 6, 8, 768], outputClusters: [25]},
                {ID: 2, profileID: 260, deviceID: 256, inputClusters: [0,3,4,5,6], outputClusters: []},
            ]},
        ],
        model: 'LED_UNI1',
        vendor: 'VIDA',
        description: 'My super CONTROLLER! alt1',
        supports: 'on/off, brightness, RGBWW',
        toZigbee: [tz.light_onoff_brightness, tz.light_color_colortemp, tz.light_colortemp_startup],
        ota: ota.zigbeeOTA,
        // check work
        //ota: otaConverter,
        fromZigbee: [fz.on_off_skip_duplicate_transaction, fz.on_off, fz.brightness, fz.color_colortemp, fz.identify],
        exposes: [e.light_brightness_colortemp_colorhs([153, 500]).withEndpoint(1), e.switch().withEndpoint(2)],        
    },
    
    {
        fingerprint: [
            {type: 'Router', modelID: 'LED_UNI1', endpoints: [
                {ID: 1,  profileID: 260, deviceID: 258, inputClusters: [0, 3, 4, 5, 6, 8, 768], outputClusters: [25]},
                {ID: 3, profileID: 260, deviceID: 256, inputClusters: [0,3,4,5,6], outputClusters: []},
            ]},
        ],
        model: 'LED_UNI1',
        vendor: 'VIDA',
        description: 'My super CONTROLLER! alt2',
        supports: 'on/off, brightness, RGBWW',
        toZigbee: [tz.light_onoff_brightness, tz.light_color_colortemp, tz.light_colortemp_startup],
        ota: ota.zigbeeOTA,
        // check work
        //ota: otaConverter,
        fromZigbee: [fz.on_off_skip_duplicate_transaction, fz.on_off, fz.brightness, fz.color_colortemp, fz.identify],
        exposes: [e.light_brightness_colortemp_colorhs([153, 500]).withEndpoint(1), e.switch().withEndpoint(3)],        
    }
];

module.exports = definition;
