import React,{ useState } from "react";
import {Card, CardHeader, CardBody, Image, Divider} from "@nextui-org/react";

const imageCard = ({item}) => {

    return(
        <div>
            <Card className="m-2">
                <CardHeader className="flex gap-3">
                    <Image 
                        src={item.image_url} 
                        alt={item.label}
                        width="270"
                    />
                </CardHeader>
                <Divider />
                <CardBody>
                    <p className="text-md">{item.label}</p>
                    <p>Image Author: {item.image_author}</p>
                    <p>Submission Date: {item.submission_date}</p>
                    <p>Type: {item.instance_of_type_label}</p>
                    <p>Location: {item.latitude}, {item.longitude}</p>
                </CardBody>
            </Card>
        </div>
    )
}

export default imageCard