import { isValidElement } from 'react';

// React-compatible prop validators without an additional runtime dependency.
const validator = (matches, expected) => {
    const validate = (required, props, name, component) => {
        const value = props[name];
        if (value == null && !required) return null;
        if (value != null && matches(value)) return null;
        return new Error(`Invalid prop \`${name}\` supplied to \`${component}\`: expected ${expected}.`);
    };
    const check = validate.bind(null, false);
    check.isRequired = validate.bind(null, true);
    return check;
};

const isNode = (value) =>
    value == null || typeof value === 'boolean' || typeof value === 'string' ||
    typeof value === 'number' || isValidElement(value) ||
    (Array.isArray(value) && value.every(isNode));

const PropTypes = {
    number: validator((value) => typeof value === 'number', 'a number'),
    string: validator((value) => typeof value === 'string', 'a string'),
    bool: validator((value) => typeof value === 'boolean', 'a boolean'),
    node: validator(isNode, 'a React node'),
    shape: (fields) => validator(
        (value) => typeof value === 'object' && !Array.isArray(value) &&
            Object.entries(fields).every(([name, check]) => check(value, name, 'prop shape') == null),
        'an object matching the required shape'
    ),
};

export default PropTypes;
