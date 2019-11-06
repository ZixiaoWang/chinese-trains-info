import { h } from 'preact';

export const Hero = (props: any) => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                {props.children}
            </div>
        </section>
    )
}