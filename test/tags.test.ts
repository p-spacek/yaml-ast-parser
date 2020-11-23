import { assert } from "chai";
import * as YAML from '../src';
import failsafe = require('../src/schema/failsafe');
import * as fs from 'fs';
import * as path from 'path';
import json = require('../src/schema/json');
import core = require('../src/schema/core');

suite('YAML Tag Tests', () => {
    test('Failsafe YAML schema should validate all properties successfully', function () {
        const failSafeSchema = fs.readFileSync(path.join('test', 'testFixtures', 'failsafe_schema.yaml'));
        const document = YAML.load(failSafeSchema.toString(), {
            schema: failsafe
        });

        assert.equal(document.errors.length, 0);

        // Map block style test
        assert.equal(document.mappings[0].key.value, "Block-map");
        assert.equal(document.mappings[0].value.mappings.length, 3);
        assert.equal(document.mappings[0].value.mappings[0].key.value, "Clark");
        assert.equal(document.mappings[0].value.mappings[0].value.value, "Evans");
        assert.equal(document.mappings[0].value.mappings[1].key.value, "Ingy");
        assert.equal(document.mappings[0].value.mappings[1].value.value, "döt Net");
        assert.equal(document.mappings[0].value.mappings[2].key.value, "Oren");
        assert.equal(document.mappings[0].value.mappings[2].value.value, "Ben-Kiki");

        // Map flow style test
        assert.equal(document.mappings[1].key.value, "Flow-map");
        assert.equal(document.mappings[1].value.mappings.length, 3);
        assert.equal(document.mappings[1].value.mappings[0].key.value, "Clark");
        assert.equal(document.mappings[1].value.mappings[0].value.value, "Evans");
        assert.equal(document.mappings[1].value.mappings[1].key.value, "Ingy");
        assert.equal(document.mappings[1].value.mappings[1].value.value, "döt Net");
        assert.equal(document.mappings[1].value.mappings[2].key.value, "Oren");
        assert.equal(document.mappings[1].value.mappings[2].value.value, "Ben-Kiki");

        // Seq block style test
        assert.equal(document.mappings[2].key.value, "Block-seq");
        assert.equal(document.mappings[2].value.items.length, 3);
        assert.equal(document.mappings[2].value.items[0].value, "Clark Evans");
        assert.equal(document.mappings[2].value.items[1].value, "Ingy döt Net");
        assert.equal(document.mappings[2].value.items[2].value, "Oren Ben-Kiki");

        // Flow block style test
        assert.equal(document.mappings[3].key.value, "Flow-seq");
        assert.equal(document.mappings[3].value.items.length, 3);
        assert.equal(document.mappings[3].value.items[0].value, "Clark Evans");
        assert.equal(document.mappings[3].value.items[1].value, "Ingy döt Net");
        assert.equal(document.mappings[3].value.items[2].value, "Oren Ben-Kiki");

        // String block style test
        assert.equal(document.mappings[4].key.value, "Block-style");
        assert.equal(document.mappings[4].value.value, "String: just a theory.");

        // String flow style test
        assert.equal(document.mappings[5].key.value, "Flow-style");
        assert.equal(document.mappings[5].value.value, "String: just a theory.");
    });

    test('JSON YAML schema should validate all properties successfully', function () {
        const jsonSchema = fs.readFileSync(path.join('test', 'testFixtures', 'json_schema.yaml'));
        const document = YAML.load(jsonSchema.toString(), {
            schema: json
        });

        assert.equal(document.errors.length, 0);

        assert.equal(document.mappings[0].key.value, "YAML");
        assert.equal(document.mappings[0].value.value, "true");

        assert.equal(document.mappings[1].key.value, "Pluto");
        assert.equal(document.mappings[1].value.value, "false");

        assert.equal(document.mappings[2].key.value, "negativeInt");
        assert.equal(document.mappings[2].value.value, "-12");

        assert.equal(document.mappings[3].key.value, "zeroInt");
        assert.equal(document.mappings[3].value.value, "0");

        assert.equal(document.mappings[4].key.value, "positiveInt");
        assert.equal(document.mappings[4].value.value, "34");

        assert.equal(document.mappings[5].key.value, "negativeFloat");
        assert.equal(document.mappings[5].value.value, "-1");

        assert.equal(document.mappings[6].key.value, "zeroFloat");
        assert.equal(document.mappings[6].value.value, "0");

        assert.equal(document.mappings[7].key.value, "positiveFloat");
        assert.equal(document.mappings[7].value.value, "2.3e4");

        assert.equal(document.mappings[8].key.value, "infinityFloat");
        assert.equal(document.mappings[8].value.value, ".inf");

        assert.equal(document.mappings[9].key.value, "notFloat");
        assert.equal(document.mappings[9].value.value, ".nan");

        assert.equal(document.mappings[10].key.value, "null");
        assert.equal(document.mappings[10].value.value, "value for null key");

        assert.equal(document.mappings[11].key.value, "key with null value");
        assert.equal(document.mappings[11].value.value, "null");
    });

    test('Core YAML schema should validate all properties successfully', function () {
        const jsonSchema = fs.readFileSync(path.join('test', 'testFixtures', 'core_schema.yaml'));
        const document = YAML.load(jsonSchema.toString(), {
            schema: core
        });

        assert.equal(document.errors.length, 0);

        assert.equal(document.mappings[0].key.value, "A null");
        assert.equal(document.mappings[0].value.value, "null");

        assert.equal(document.mappings[1].key.value, "Also a null");
        assert.equal(document.mappings[1].value, null);

        assert.equal(document.mappings[2].key.value, "Not a null");
        assert.equal(document.mappings[2].value.value, "");

        assert.equal(document.mappings[3].key.value, "Booleans");
        assert.equal(document.mappings[3].value.items.length, 4);

        assert.equal(document.mappings[3].value.items[0].value, 'true');
        assert.equal(document.mappings[3].value.items[1].value, 'True');
        assert.equal(document.mappings[3].value.items[2].value, 'false');
        assert.equal(document.mappings[3].value.items[3].value, 'FALSE');

        assert.equal(document.mappings[4].key.value, "Integers");
        assert.equal(document.mappings[4].value.items.length, 4);

        assert.equal(document.mappings[4].value.items[0].value, '0');
        assert.equal(document.mappings[4].value.items[1].value, '0o7');
        assert.equal(document.mappings[4].value.items[2].value, '0x3A');
        assert.equal(document.mappings[4].value.items[3].value, '-19');

        assert.equal(document.mappings[5].key.value, "Floats");
        assert.equal(document.mappings[5].value.items.length, 5);

        assert.equal(document.mappings[5].value.items[0].value, '0.');
        assert.equal(document.mappings[5].value.items[1].value, '-0.0');
        assert.equal(document.mappings[5].value.items[2].value, '.5');
        assert.equal(document.mappings[5].value.items[3].value, '+12e03');
        assert.equal(document.mappings[5].value.items[4].value, '-2E+05');

        assert.equal(document.mappings[6].key.value, "Also floats");
        assert.equal(document.mappings[6].value.items.length, 4);

        assert.equal(document.mappings[6].value.items[0].value, '.inf');
        assert.equal(document.mappings[6].value.items[1].value, '-.Inf');
        assert.equal(document.mappings[6].value.items[2].value, '+.INF');
        assert.equal(document.mappings[6].value.items[3].value, '.NAN');
    });

    test('omap tag should validate correctly', function () {
        const omap = fs.readFileSync(path.join('test', 'testFixtures', 'omap.yaml'));
        const document = YAML.load(omap.toString());

        assert.equal(document.errors.length, 0);

        assert.equal(document.mappings[0].key.value, "Bestiary");
        assert.equal(document.mappings[0].value.items.length, 3);
        assert.equal(document.mappings[0].value.items[0].mappings[0].key.value, "aardvark");
        assert.equal(document.mappings[0].value.items[0].mappings[0].value.value, "African pig-like ant eater. Ugly.");
        assert.equal(document.mappings[0].value.items[1].mappings[0].key.value, "anteater");
        assert.equal(document.mappings[0].value.items[1].mappings[0].value.value, "South-American ant eater. Two species.");
        assert.equal(document.mappings[0].value.items[2].mappings[0].key.value, "anaconda");
        assert.equal(document.mappings[0].value.items[2].mappings[0].value.value, "South-American constrictor snake. Scaly.");

        assert.equal(document.mappings[1].key.value, "Numbers");
        assert.equal(document.mappings[1].value.items.length, 3);
        assert.equal(document.mappings[1].value.items[0].mappings[0].key.value, "one");
        assert.equal(document.mappings[1].value.items[0].mappings[0].value.value, "1");
        assert.equal(document.mappings[1].value.items[1].mappings[0].key.value, "two");
        assert.equal(document.mappings[1].value.items[1].mappings[0].value.value, "2");
        assert.equal(document.mappings[1].value.items[2].mappings[0].key.value, "three");
        assert.equal(document.mappings[1].value.items[2].mappings[0].value.value, "3");
    });

    test('set tag should validate correctly', function () {
        const set = fs.readFileSync(path.join('test', 'testFixtures', 'set.yaml'));
        const document = YAML.load(set.toString());

        assert.equal(document.errors.length, 0);

        assert.equal(document.mappings.length, 3);
        assert.equal(document.mappings[0].key.value, "Mark McGwire");
        assert.equal(document.mappings[0].value, null);
        assert.equal(document.mappings[1].key.value, "Sammy Sosa");
        assert.equal(document.mappings[1].value, null);
        assert.equal(document.mappings[2].key.value, "Ken Griff");
        assert.equal(document.mappings[2].value, null);
    });

    test('timestamp tag should validate correctly', function () {
        const timestamp = fs.readFileSync(path.join('test', 'testFixtures', 'timestamp.yaml'));
        const document = YAML.load(timestamp.toString());

        assert.equal(document.errors.length, 0);

        assert.equal(document.mappings.length, 4);
        assert.equal(document.mappings[0].key.value, "canonical");
        assert.equal(document.mappings[0].value.value, "2001-12-15T02:59:43.1Z");
        assert.equal(document.mappings[1].key.value, "iso8601");
        assert.equal(document.mappings[1].value.value, "2001-12-14t21:59:43.10-05:00");
        assert.equal(document.mappings[2].key.value, "spaced");
        assert.equal(document.mappings[2].value.value, "2001-12-14 21:59:43.10 -5");
        assert.equal(document.mappings[3].key.value, "date");
        assert.equal(document.mappings[3].value.value, "2002-12-14");
    });
});
