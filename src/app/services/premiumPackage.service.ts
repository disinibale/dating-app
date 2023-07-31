import BaseService from "./base.service";
import PremiumPackage from '../../models/premiumPackage.model';

class PremiumPackageService extends BaseService<PremiumPackage> {}

export default new PremiumPackageService(PremiumPackage)