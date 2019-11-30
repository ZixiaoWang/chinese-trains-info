import { h } from 'preact';

export const Hero = (props: any) => {
    return (
        <section className="hero">
            <div className="hero-body">
                {props.children}
            </div>
        </section>
    )
}