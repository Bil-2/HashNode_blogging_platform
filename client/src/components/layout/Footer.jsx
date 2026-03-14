import { Link } from 'react-router-dom';
import { XIcon, GithubIcon, LinkedinIcon } from '../common/Icons';

const Footer = () => (
    <footer className="mt-16 sm:mt-20 text-text-secondary px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 bg-glass backdrop-blur-lg rounded-lg sm:rounded-xl border border-glass">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                <div className="sm:col-span-1">
                    <Link to="/" className="text-text-primary font-bold text-xl sm:text-2xl tracking-wider block">
                        HashNode
                    </Link>
                    <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed">A modern blogging platform with a sleek glassmorphism design.</p>
                    <div className="flex space-x-3 sm:space-x-4 mt-3 sm:mt-4">
                        <a href="https://x.com/bag_biltu?s=21" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-lg sm:text-xl" aria-label="X"><XIcon /></a>
                        <a href="https://github.com/Bil-2" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-lg sm:text-xl" aria-label="GitHub"><GithubIcon /></a>
                        <a href="https://www.linkedin.com/in/biltu-bag-01b5172a7/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-text-primary transition-colors text-lg sm:text-xl" aria-label="LinkedIn"><LinkedinIcon /></a>
                    </div>
                </div>
                <div className="sm:col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-text-primary tracking-wider uppercase">Company</h3>
                        <ul className="mt-3 sm:mt-4 space-y-2">
                            <li><Link to="/about" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">About</Link></li>
                            <li><Link to="/contact" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Contact</Link></li>
                            <li><Link to="/pricing" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-text-primary tracking-wider uppercase">Resources</h3>
                        <ul className="mt-3 sm:mt-4 space-y-2">
                            <li><Link to="/explore-blogs" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/help-center" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Help Center</Link></li>
                            <li><Link to="/community" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Community</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-text-primary tracking-wider uppercase">Legal</h3>
                        <ul className="mt-3 sm:mt-4 space-y-2">
                            <li><Link to="/privacy-policy" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/disclaimer" className="text-xs sm:text-sm md:text-base text-text-secondary hover:text-text-primary transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 sm:mt-10 md:mt-12 border-t border-glass pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
                <p className="text-xs sm:text-sm text-text-secondary text-center sm:text-left">&copy; {new Date().getFullYear()} HashNode. All rights reserved.</p>
                <div className="text-xs sm:text-sm text-text-secondary text-center">Designed by <span className="relative group text-text-primary font-semibold cursor-pointer hover:text-indigo-500"><a href='https://www.linkedin.com/in/biltu-bag-01b5172a7/' target="_blank" rel="noopener noreferrer">BILTU BAG</a>
                    <div className="absolute bottom-full mb-2 w-56 sm:w-64 bg-glass backdrop-blur-lg border border-glass rounded-lg p-2 sm:p-3 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto -translate-x-1/2 left-1/2 z-10 shadow-xl">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img
                                src="https://media.licdn.com/dms/image/v2/D5603AQGAFqDci5xVWA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1730699917222?e=1768608000&v=beta&t=Vh19WUEvY-UWxnJOs-7WgwPXTMIlNcg8YzVb-1nZdR4"
                                alt="Biltu Bag"
                                className="rounded-full w-10 sm:w-[50px] h-10 sm:h-[50px] border-2 border-indigo-500"
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/6366F1/FFFFFF?text=BB'; }}
                            />
                            <div className="min-w-0">
                                <p className="font-bold text-xs sm:text-sm text-text-primary">BILTU BAG</p>
                                <p className="text-xs text-text-secondary">Full Stack (MERN)</p>
                            </div>
                        </div>
                    </div>
                </span></div>
            </div>
        </div>
    </footer>
);

export default Footer;