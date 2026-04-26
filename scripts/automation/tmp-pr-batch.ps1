$ErrorActionPreference='Stop'
Set-Location 'E:\3A'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'
$repo = 'Thang4869/Multi-channel-Commerce-System'

function New-Body($purpose, $scopeLines, $issue, $testingLine, $checks){
  $scopeText = ($scopeLines | ForEach-Object { "- $_" }) -join "`n"
  $checkText = ($checks | ForEach-Object { "- [ ] $_" }) -join "`n"
@"
## Pull Request Description
### Purpose
$purpose

### Scope
$scopeText

### Linked Issue
- Closes #$issue

### Review Checklist
$checkText

### Testing
- $testingLine
"@
}

$plans = @(
  @{ branch='docs/internal-standards'; title='docs(repo): add internal standards and architecture docs'; issue=2; purpose='Publish internal standards and core architecture documentation for onboarding and team alignment.'; scope=@('Add internal communication standards document','Add architecture and quick-start aligned docs'); testing='Documentation-only change.'; checks=@('Document scope is clear','Terminology is consistent','No runtime behavior change') },
  @{ branch='chore/tooling-error-fix'; title='chore(tooling): add IDE error handling and maintenance scripts'; issue=3; purpose='Standardize IDE error handling process and maintenance scripts for team productivity.'; scope=@('Add IDE/error tracking documents','Add scripts for clean/fix/start routines'); testing='Script/documentation-only update.'; checks=@('Scripts are safe to run locally','Docs match script behavior','No production runtime change') },
  @{ branch='feat/infrastructure-compose-nginx'; title='feat(infra): add nginx and compose baseline for local orchestration'; issue=5; purpose='Provide infrastructure baseline for local routing and service orchestration.'; scope=@('Add nginx base and vhost configuration','Add compose definition for local orchestration'); testing='Infrastructure config scaffolding only.'; checks=@('Routing paths are documented','Service mapping is understandable','No app logic change') },
  @{ branch='feat/shared-prisma-foundation'; title='feat(platform): add prisma foundation and shared types package'; issue=6; purpose='Introduce initial database schema/seed and shared type contracts for cross-service consistency.'; scope=@('Add prisma schema and seed foundation','Add shared types package baseline'); testing='No runtime behavior validated in this PR.'; checks=@('Schema baseline is readable','Shared contracts are versionable','No API breaking claim in scaffold PR') },
  @{ branch='feat/auth-service-core'; title='feat(auth): scaffold auth service core layers'; issue=8; purpose='Scaffold auth-service foundation across module, domain, application, and interface layers.'; scope=@('Add auth-service bootstrap/module baseline','Add domain/application/interface scaffolds'); testing='Scaffold-focused; no functional verification included.'; checks=@('Layer boundaries are explicit','Naming follows conventions','No production secret committed') },
  @{ branch='feat/order-service-core'; title='feat(order): scaffold order service core layers'; issue=10; purpose='Scaffold order-service foundation for future endpoint and repository implementation.'; scope=@('Add order-service bootstrap/module baseline','Add domain/application/infrastructure placeholders'); testing='Scaffold-focused; no functional verification included.'; checks=@('Repository boundary is explicit','HTTP contract placeholders are clear','No runtime behavior guarantees in this scaffold PR') },
  @{ branch='feat/web-dashboard-foundation'; title='feat(web): scaffold warehouse dashboard foundation'; issue=12; purpose='Initialize Next.js warehouse dashboard foundation with route, API client, and store setup.'; scope=@('Add dashboard and login route baseline','Add API/store foundational setup'); testing='UI scaffold only; behavior validation deferred.'; checks=@('Route structure is coherent','State/API boundaries are clear','No backend contract change in this PR') },
  @{ branch='feat/mobile-delivery-foundation'; title='feat(mobile): scaffold delivery app foundation and assets'; issue=15; purpose='Initialize Flutter delivery app foundation with core screens/services/assets structure.'; scope=@('Add delivery app entrypoint and core screens','Add provider/model/service and assets baseline'); testing='Mobile scaffold only; runtime validation deferred.'; checks=@('Folder structure supports scaling','Assets organization is consistent','No production behavior change in scaffold PR') },

  @{ branch='testing/auth-service-test-skeleton'; title='test(auth): scaffold unit test plan for auth-service'; issue=17; purpose='Introduce lightweight scaffold for auth-service unit test planning and review flow.'; scope=@('Add branch-scaffold note for auth test structure and acceptance checklist'); testing='No runtime test impact (documentation/scaffold only).'; checks=@('Scope is limited to scaffold only','Naming and conventions align with repository standards','No runtime behavior change') },
  @{ branch='testing/order-service-test-skeleton'; title='test(order): scaffold unit test plan for order-service'; issue=18; purpose='Introduce lightweight scaffold for order-service unit test planning and review flow.'; scope=@('Add branch-scaffold note for order test structure and acceptance checklist'); testing='No runtime test impact (documentation/scaffold only).'; checks=@('Scope is limited to scaffold only','Naming and conventions align with repository standards','No runtime behavior change') },
  @{ branch='testing/contract-smoke-checklist'; title='test(shared): add cross-service contract smoke checklist'; issue=7; purpose='Introduce a lightweight checklist for cross-service contract smoke verification.'; scope=@('Add scaffold note for API contract checks across shared/service boundaries'); testing='No runtime behavior change; checklist-only update.'; checks=@('Contract boundaries are explicit','Checklist can be executed by reviewers','No production code path changed') },
  @{ branch='testing/e2e-pipeline-placeholder'; title='test(e2e): add e2e pipeline placeholder and reviewer notes'; issue=14; purpose='Provide placeholder guidance for future E2E pipeline rollout.'; scope=@('Add scaffold note for E2E pipeline stages and reviewer expectations'); testing='No runtime behavior change; planning artifact only.'; checks=@('E2E scope is documented','Pipeline stages are understandable','No execution workflow altered yet') },
  @{ branch='security/jwt-secret-env-audit'; title='security(auth): add JWT secret and env audit scaffold'; issue=19; purpose='Prepare security audit baseline for JWT secret handling and environment variable policy.'; scope=@('Add checklist for secret rotation and env source validation','Add reviewer evidence checklist for security baseline'); testing='No runtime change.'; checks=@('No secret value committed','Security controls are actionable','Follow-up tasks clearly defined') },
  @{ branch='security/dependency-audit-baseline'; title='security(deps): add dependency audit baseline checklist'; issue=24; purpose='Establish dependency security audit baseline and vulnerability triage workflow.'; scope=@('Add checklist for dependency scan cadence','Add baseline triage and escalation notes'); testing='No runtime change; checklist-only baseline.'; checks=@('Audit process is repeatable','Severity triage flow is clear','No package behavior changed') },
  @{ branch='refactor/application-barrel-exports'; title='refactor(application): scaffold barrel export standardization plan'; issue=21; purpose='Set a refactor baseline for barrel exports in application layer to reduce import fragmentation.'; scope=@('Add structured checklist for migration sequencing','Add rollback/compatibility review notes'); testing='Not applicable (scaffold only).'; checks=@('Refactor boundaries are clear','No API contract change in this PR','Next migration steps documented') },
  @{ branch='refactor/shared-api-client-config'; title='refactor(frontend): scaffold shared API client extraction plan'; issue=22; purpose='Define extraction plan for shared API client configuration between web and mobile.'; scope=@('Add scaffold checklist for shared config ownership','Add migration path and compatibility notes'); testing='No runtime change; planning artifact only.'; checks=@('Shared ownership is explicit','Migration plan is incremental','Backward compatibility concerns are listed') },
  @{ branch='refactor/repository-contract-alignment'; title='refactor(order): add repository contract alignment checklist'; issue=11; purpose='Prepare repository contract alignment plan for order domain and interfaces.'; scope=@('Add checklist for repository contract consistency','Add interface review points for order service'); testing='No runtime change; checklist-only update.'; checks=@('Contract assumptions are listed','Repository boundaries are clear','No endpoint behavior altered in this PR') },
  @{ branch='ci/monorepo-workflow-skeleton'; title='ci(monorepo): scaffold lint-build-test workflow plan'; issue=20; purpose='Prepare CI structure for monorepo lint/build/test stages with phased rollout.'; scope=@('Add workflow scaffold note and review gates','Document pipeline stage responsibilities'); testing='CI behavior not changed yet (planning scaffold only).'; checks=@('Pipeline stages are explicit','Cache/artifact strategy documented','Failure policy for PRs is defined') },
  @{ branch='ci/pr-review-gate-skeleton'; title='ci(review): add PR review gate checklist scaffold'; issue=23; purpose='Define PR review gate scaffold for required checks and branch protection policy.'; scope=@('Add checklist for required checks and reviewer gates','Align branch protection policy baseline'); testing='No workflow execution change; planning artifact only.'; checks=@('Required checks are listed','Review gate criteria are measurable','Branch protection alignment is documented') }
)

$created = @()
$updated = @()
$skipped = @()

foreach($p in $plans){
  $prJson = & $gh pr list --repo $repo --head $p.branch --state all --json number,url,title,state 2>$null
  $pr = $null
  if($prJson){
    $arr = $prJson | ConvertFrom-Json
    if($arr.Count -gt 0){ $pr = $arr[0] }
  }

  $body = New-Body $p.purpose $p.scope $p.issue $p.testing $p.checks
  $tmp = [System.IO.Path]::GetTempFileName()
  Set-Content -Path $tmp -Value $body -Encoding utf8

  if(-not $pr){
    $url = & $gh pr create --repo $repo --base main --head $p.branch --title $p.title --body-file $tmp
    if($LASTEXITCODE -ne 0){ Remove-Item $tmp -Force; throw "Failed to create PR for $($p.branch)" }
    $created += [PSCustomObject]@{ branch=$p.branch; title=$p.title; url=$url.Trim(); issue=$p.issue }
  } else {
    & $gh pr edit $pr.number --repo $repo --title $p.title --body-file $tmp | Out-Null
    if($LASTEXITCODE -ne 0){ Remove-Item $tmp -Force; throw "Failed to edit PR #$($pr.number) for $($p.branch)" }
    $updated += [PSCustomObject]@{ pr=$pr.number; branch=$p.branch; issue=$p.issue; url=$pr.url }
  }

  Remove-Item $tmp -Force
}

$order = @(
  'docs/internal-standards',
  'chore/tooling-error-fix',
  'feat/infrastructure-compose-nginx',
  'feat/shared-prisma-foundation',
  'feat/auth-service-core',
  'feat/order-service-core',
  'feat/web-dashboard-foundation',
  'feat/mobile-delivery-foundation',
  'testing/auth-service-test-skeleton',
  'testing/order-service-test-skeleton',
  'testing/contract-smoke-checklist',
  'testing/e2e-pipeline-placeholder',
  'security/jwt-secret-env-audit',
  'security/dependency-audit-baseline',
  'refactor/application-barrel-exports',
  'refactor/shared-api-client-config',
  'refactor/repository-contract-alignment',
  'ci/monorepo-workflow-skeleton',
  'ci/pr-review-gate-skeleton'
)

$open = & $gh pr list --repo $repo --state open --limit 200 --json number,title,headRefName,url,body | ConvertFrom-Json
$map = @{}
foreach($o in $open){
  $m = [regex]::Match(($o.body | Out-String),'(?im)Closes\s+#(\d+)')
  $iid = if($m.Success){ [int]$m.Groups[1].Value } else { $null }
  $map[$o.headRefName] = [PSCustomObject]@{ pr=$o.number; issue=$iid; title=$o.title; url=$o.url }
}

"=== CREATED_PRS ==="
$created | ForEach-Object { "CREATED|$($_.branch)|issue#$($_.issue)|$($_.url)" }
"=== UPDATED_PRS ==="
$updated | Sort-Object pr | ForEach-Object { "UPDATED|PR#$($_.pr)|$($_.branch)|issue#$($_.issue)|$($_.url)" }

"=== MERGE_SCHEDULE day|pr|branch|issue|status|url ==="
$day=1
foreach($b in $order){
  if($map.ContainsKey($b)){
    $x = $map[$b]
    "{0}|{1}|{2}|{3}|OPEN|{4}" -f $day,$x.pr,$b,$x.issue,$x.url
  } else {
    "{0}|NA|{1}|NA|MISSING_PR|" -f $day,$b
  }
  $day++
}

$uniqueIssues = ($map.Values | ForEach-Object { $_.issue } | Where-Object { $_ -ne $null } | Sort-Object -Unique)
"TOTAL_OPEN_PRS=$($open.Count)"
"TOTAL_UNIQUE_LINKED_ISSUES=$($uniqueIssues.Count)"
"UNIQUE_LINKED_ISSUES=" + ($uniqueIssues -join ',')
