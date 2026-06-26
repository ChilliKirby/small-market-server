import xss from 'xss';
import { Request, Response, NextFunction } from 'express';


const sanitizeCategories = (arr: any) => {
  if (!Array.isArray(arr)) return [];

  return arr
    .map((c) => String(c).toLowerCase().trim())
    .filter((c) => /^[a-z0-9-]+$/.test(c)); // only valid slugs
};

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.body = {
        name: xss(req.body.name),
        email: xss(req.body.email),
        phone: xss(req.body.phone),
        street: xss(req.body.street),
        city: xss(req.body.city),
        state: xss(req.body.state),
        zipcode: xss(req.body.zipcode),
        website: xss(req.body.website),
        info: xss(req.body.info),
        categories: sanitizeCategories(req.body.categories),
    };

    next();
}