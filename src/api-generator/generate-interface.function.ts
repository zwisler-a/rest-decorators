import { Type } from '../interfaces/type.interface';

export function generateInterface(type: Type<any>) {
    const name = type.constructor.name;
    const fields = getType(type, 0);
    const template = `export interface ${name} ${fields}\n`;
    return { name, template };
}

function getObjectDescription(obj: Object, intendation: number) {
    return `{
${genIntend(intendation)}${Object.keys(obj)
        .map(key => key + ': ' + getType(obj[key], intendation))
        .join(';\r\n' + genIntend(intendation))};
${genIntend(intendation - 1)}}`;
}

function getArrayDescription(arr: any[], intendation: number) {
    if (arr.length === 0) {
        return 'any[]';
    } else {
        return getType(arr[0], intendation) + '[]';
    }
}

function getType(obj, intendation: number) {
    if (Array.isArray(obj)) {
        return getArrayDescription(obj, intendation);
    } else if (typeof obj === 'object') {
        return getObjectDescription(obj, intendation + 1);
    } else {
        const type = typeof obj;
        return type === 'undefined' ? 'any' : type;
    }
}

function genIntend(indendation: number) {
    let intend = '';
    for (let a = 0; a < indendation; a++) {
        intend = intend + '    ';
    }
    return intend;
}
