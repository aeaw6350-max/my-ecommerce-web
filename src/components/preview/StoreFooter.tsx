import React from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Download,
  CreditCard,
  Truck
} from 'lucide-react';
import { useStoreDesign } from '../../contexts/StoreDesignContext';

const StoreFooter: React.FC = () => {
  const { state } = useStoreDesign();
  const { footerConfig, viewMode } = state;

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'twitter':
        return Twitter;
      case 'instagram':
        return Instagram;
      default:
        return Facebook;
    }
  };

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{
        backgroundColor: footerConfig.backgroundColor,
        color: footerConfig.textColor,
      }}
      className="mt-auto"
    >
      <div className={`${viewMode === 'mobile' ? 'px-4' : 'px-6'} py-8`}>
        <div className={`grid ${viewMode === 'mobile' ? 'grid-cols-1 gap-6' : 'grid-cols-2 md:grid-cols-4 gap-8'}`}>
          {/* Important Links */}
          {footerConfig.importantLinks.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">روابط مهمة</h3>
              <ul className="space-y-2">
                {footerConfig.importantLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                  >
                    <a
                      href={link.url}
                      className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Media */}
          {footerConfig.socialMedia.length > 0 && (
            <div>
              <h3 className="font-semibold mb-4">تابعنا</h3>
              <div className="flex flex-wrap gap-3">
                {footerConfig.socialMedia.map((social, index) => {
                  const IconComponent = getSocialIcon(social.platform);
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                    >
                      <IconComponent className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          )}

          {/* App Download */}
          {(footerConfig.appDownload.ios || footerConfig.appDownload.android) && (
            <div>
              <h3 className="font-semibold mb-4">حمل التطبيق</h3>
              <div className="space-y-2">
                {footerConfig.appDownload.ios && (
                  <motion.a
                    href={footerConfig.appDownload.ios}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-sm"
                  >
                    <Download className="h-4 w-4" />
                    App Store
                  </motion.a>
                )}
                {footerConfig.appDownload.android && (
                  <motion.a
                    href={footerConfig.appDownload.android}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Google Play
                  </motion.a>
                )}
              </div>
            </div>
          )}

          {/* Payment & Shipping */}
          <div>
            <h3 className="font-semibold mb-4">الدفع والشحن</h3>
            <div className="space-y-3">
              {footerConfig.paymentMethods.length > 0 && (
                <div>
                  <p className="text-sm opacity-80 mb-2">طرق الدفع</p>
                  <div className="flex gap-2">
                    {footerConfig.paymentMethods.map((method, index) => (
                      <div
                        key={index}
                        className="p-1 bg-white bg-opacity-20 rounded text-xs"
                      >
                        <CreditCard className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {footerConfig.shippingCompanies.length > 0 && (
                <div>
                  <p className="text-sm opacity-80 mb-2">شركات الشحن</p>
                  <div className="flex gap-2">
                    {footerConfig.shippingCompanies.map((company, index) => (
                      <div
                        key={index}
                        className="p-1 bg-white bg-opacity-20 rounded text-xs"
                      >
                        <Truck className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-white border-opacity-20 mt-8 pt-6 text-center"
        >
          <p className="text-sm opacity-80">
            جميع الحقوق محفوظة © 2025 {state.headerConfig.logo}
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default StoreFooter;
