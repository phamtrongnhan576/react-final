import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-12 pb-6 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4">
                    <div className="col-span-1">
                        <h2 className="text-2xl font-bold mb-4">MoviesHand</h2>
                        <p className="text-gray-400 mb-4">
                            Need to help for your dream Career?
                            <br />
                            trust us. With lesson, study becomes
                            <br />a lot easier with us.
                        </p>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Our Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Latest News
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    FAQ's
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-span-1">
                        <h3 className="text-lg font-semibold mb-4">Address</h3>
                        <address className="text-gray-400 not-italic">
                            <p className="mb-2">
                                Location: 27 Division St, New York, NY 10002,
                                USA
                            </p>
                            <p className="mb-2">Email: Movies@gmail.com</p>
                            <p>Phone: + 000 1234 567 890</p>
                        </address>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
                    <p>Copyright ©2025 MoviesHand All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
