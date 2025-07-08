'use server'

import { NextResponse } from 'next/server'
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), './app/api/comments/commentData.json');

export async function GET(request) {

    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);

    return NextResponse.json(objectData)
}

export async function POST(request) {

    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    const req = await request.json()
    const {data, flag} = req

    if (flag === "multiple") {
        data.map((item) =>{
            objectData.push(item)
        })
    } else {
        const newId = parseInt(objectData.reduce((max, current) => (current.id > max) ? current.id : max, 1)) + 1;
        data["id"] = newId

        console.log('New Data:');
        console.log(data);

        objectData.push(data);

    }
    const updatedData = JSON.stringify(objectData);

    await fsPromises.writeFile(dataFilePath, updatedData);

    return NextResponse.json(updatedData)
}

export async function DELETE(request) {

    const jsonData = await fsPromises.readFile(dataFilePath);
    const objectData = JSON.parse(jsonData);
    const req = await request.json()
    const {data:dataIdToRemove, flag} = req

    console.log('dataIdToRemove:', dataIdToRemove)

    const updatedItems = objectData.filter(item => item.id !== dataIdToRemove);
    const updatedData = JSON.stringify(updatedItems);

    await fsPromises.writeFile(dataFilePath, updatedData);

    return NextResponse.json(JSON.parse(updatedData))
}