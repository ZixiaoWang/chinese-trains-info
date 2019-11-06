import { Component, ComponentConstructor } from "preact";

export function attach (object: { [key: string]: any }) {
    return function (target: any) {
        if (object && Object.prototype.toString.call(object) === '[object Object]') {
            for (let key in object) {
                Object.setPrototypeOf(target, object);
            }
        }
        return target;
    }
}