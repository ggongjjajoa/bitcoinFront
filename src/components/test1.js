import React from 'react';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';

const test1 = (props) => {
    return (
        <div>
            <Card>
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card>
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card>
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card className="md-block-centered">
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card className="md-block-centered">
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card className="md-block-centered">
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
            <Card className="md-block-centered">
                <CardTitle title="Card Title" subtitle="Card Subtitle"/>
                <CardActions expander></CardActions>
                <CardText expandable>
                    aaaaaa
                </CardText>
            </Card>
        </div>
    );
}

export default test1;
