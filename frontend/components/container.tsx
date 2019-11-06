import { h, Component } from 'preact';

export const Container = (props: any) => {
    return (
        <div className="container">
            <div className="columns">
                <div className="column is-12">
                    {props.children}
                </div>
            </div>
        </div>
    )
}