import urls from './base_urls'

export default {
  rootUrl: () => urls.getBaseUrl(),
  companyUrl: (slug) => urls.getBaseUrl(slug),
  applicationsUrl: (slug, job_id) => urls.getBaseUrl(slug) + '/jobs/'+ job_id +'/applications/new',
  hiringTeamsUrl: (slug) => urls.getBaseUrl(slug) + '/preferences/hiring_teams',
  jobApplicantsUrl: (slug, job_id) => urls.getBaseUrl(slug) + '/jobs/'+ job_id +'/applicants',
  testUrl: (test_id) => urls.getBaseUrl() + '/tests/'+ test_id,
}