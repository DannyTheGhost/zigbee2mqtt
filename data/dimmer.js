const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const ota = require('zigbee-herdsman-converters/lib/ota');


const definition = [
    {
        zigbeeModel: ['Dimmer1Ch_1Bt'],
        model: 'Dimmer1Ch_1Bt',
        vendor: 'SmartSwitch',
        description: 'Zigbee dimmer prototype',
        supports: 'on/off, brightness',
        toZigbee: [tz.light_onoff_brightness],
//       ota: ota.zigbeeOTA,
		ota: ota.zigbeeOTA,
        // check work
        fromZigbee: [fz.on_off_skip_duplicate_transaction, fz.on_off, fz.brightness, fz.identify],
        exposes: [e.light_brightness()],        
        // The configure method below is needed to make the device reports on/off state changes
        // when the device is controlled manually through the button on it.
        // The configure method will only be executed when the device pairs or when the configureKey
        // is incremented by one.
        meta: {configureKey: 1},
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint);
            await reporting.brightness(endpoint);
        },
    }
];

module.exports = definition;