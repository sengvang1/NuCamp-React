import React from 'react';

function TestDirectory( {campsites} ) {
    if (campsites) {
        const randomNum = Math.floor(Math.random() * campsites.length);
         
        const campRando = campsites.filter(c => c.id === randomNum)[0];
        console.log(randomNum);
        console.log(campRando);

        return (
            <div className="container">
                <div className="col">
                    <h1>Rando</h1>
                    <div key={campRando.id}>
                        <div>{campRando.name}</div>
                        <img src={campRando.image}></img>
                        <div>{campRando.description}</div>
                    </div>
                </div>
            </div>
        
        );
    }
    return (
        <div>

        </div>
    );
}

 

export default TestDirectory;