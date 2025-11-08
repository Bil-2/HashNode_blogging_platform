import { TwitterIcon, GithubIcon, LinkedinIcon } from '../common/Icons';

const Footer = () => (
    <footer className="mt-20 text-text-secondary px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12 px-8 bg-glass backdrop-blur-lg rounded-xl border border-glass">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <a href="/" className="text-text-primary font-bold text-2xl tracking-wider">
                        HashNode
                    </a>
                    <p className="mt-4 text-sm text-text-secondary">A modern blogging platform with a sleek glassmorphism design.</p>
                    <div className="flex space-x-4 mt-4">
                        <a href="https://x.com/bag_biltu?s=21" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="Twitter/X"><TwitterIcon /></a>
                        <a href="https://github.com/Bil-2" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="GitHub"><GithubIcon /></a>
                        <a href="https://www.linkedin.com/in/biltu-bag-01b5172a7/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors" aria-label="LinkedIn"><LinkedinIcon /></a>
                    </div>
                </div>
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/about" className="text-base text-text-secondary hover:text-text-primary">About</a></li>
                            <li><a href="/contact" className="text-base text-text-secondary hover:text-text-primary">Contact</a></li>
                            <li><a href="/pricing" className="text-base text-text-secondary hover:text-text-primary">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">Resources</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/explore-blogs" className="text-base text-text-secondary hover:text-text-primary">Blog</a></li>
                            <li><a href="/help-center" className="text-base text-text-secondary hover:text-text-primary">Help Center</a></li>
                            <li><a href="/community" className="text-base text-text-secondary hover:text-text-primary">Community</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-text-primary tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/privacy-policy" className="text-base text-text-secondary hover:text-text-primary">Privacy Policy</a></li>
                            <li><a href="/terms" className="text-base text-text-secondary hover:text-text-primary">Terms & Conditions</a></li>
                            <li><a href="/disclaimer" className="text-base text-text-secondary hover:text-text-primary">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-glass pt-8 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-text-secondary">&copy; {new Date().getFullYear()} HashNode. All rights reserved.</p>
                <div className="text-sm text-text-secondary mt-4 sm:mt-0">Designed by <span className="relative group text-text-primary font-semibold cursor-pointer hover:text-indigo-500"><a href='https://www.linkedin.com/in/biltu-bag-01b5172a7/' target="_blank" rel="noopener noreferrer">BILTU BAG</a>
                    <div className="absolute bottom-full mb-2 w-64 bg-glass backdrop-blur-lg border border-glass rounded-lg p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto -translate-x-1/2 left-1/2 z-10 shadow-xl">
                        <div className="flex items-center">
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQGAFqDci5xVWA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730699917222?e=1768608000&v=beta&t=Vh19WUEvY-UWxnJOs-7WgwPXTMIlNcg8YzVb-1nZdR4"
                                alt="Biltu Bag"
                                className="rounded-full w-[50px] h-[50px] border-2 border-indigo-500"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/50x50/6366F1/FFFFFF?text=BB'; }}
                            />
                            <div className="ml-4">
                                <p className="font-bold text-text-primary">BILTU BAG</p>
                                <p className="text-sm text-text-secondary">Full Stack (MERN) Developer</p>
                            </div>
                        </div>
                    </div>
                </span></div>
            </div>
        </div>
    </footer>
);

export default Footer;