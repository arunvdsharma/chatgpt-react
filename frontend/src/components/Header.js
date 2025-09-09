import React from 'react';

const Header = () => {
    return (
        <header className="bg-primary text-primary-foreground text-center py-3">
            <h1 className="text-2xl font-semibold">ChatGPT Interface</h1>
            <nav>
                <ul className="flex justify-center space-x-4">
                    <li><a href="#" className="hover:text-primary-foreground/80">Home</a></li>
                    <li><a href="#" className="hover:text-primary-foreground/80">About</a></li>
                    <li><a href="#" className="hover:text-primary-foreground/80">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;