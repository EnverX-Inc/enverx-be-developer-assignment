var express = require("express");
var router = express.Router();
const BlogsController = require("../core/controllers/blogs.controller");

// const {
//     datasourceClasifyLogoValidation,
//     datasourceClassifyLoginUrlValidation,
//     datasourceCheckPrenavValidation,
//     datasourceClassifyInstitutionWebsiteValidation,
//     datasourceClasifyInstitutionLogoValidation
// } = require('./core/modules/validation')

const API_GROUP = "/api/v1";

router.get(API_GROUP + "/posts", (...args) =>
    new BlogsController().get_blogs(...args)
);

router.post(API_GROUP + "/post", (...args) =>
    new BlogsController().create_blog(...args)
);
router.delete(API_GROUP + "/post/:id", (...args) =>
    new BlogsController().delete_blog_by_id(...args)
);
router.get(API_GROUP + "/post/:id", (...args) =>
    new BlogsController().get_blog_by_id(...args)
);

router.put(API_GROUP + "/post/:id", (...args) =>
    new BlogsController().update_blog_by_id(...args)
);


// //router.get(API_GROUP + '/posts', (...args) => new BlogsController().(...args));
// router.get(API_GROUP + '/posts:id', (...args) => new DatasourceController().classify_institution_website(...args))
// router.post(API_GROUP + '/post', datasourceCheckPrenavValidation, (...args) => new DatasourceController().check_prenav(...args));

// router.put(API_GROUP + '/posts/:id', datasourceClasifyLogoValidation, (...args) => new DatasourceController().classify_logo(...args));
// router.delete(API_GROUP + '/posts/:id', datasourceClasifyInstitutionLogoValidation, (...args) => new DatasourceController().classify_institution_logo(...args));*/

module.exports = router;
