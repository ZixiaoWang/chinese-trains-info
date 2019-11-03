import { h, Component, Fragment } from 'preact';

export const HomePage = (props: any) => {
    return (
        <Fragment>
            <div className="page">

            </div>
            <div className="input-container is-from-input">
                <input type="text" className="input is-rounded" placeholder="从哪里出发？"/>
            </div>
        </Fragment>
    )
}