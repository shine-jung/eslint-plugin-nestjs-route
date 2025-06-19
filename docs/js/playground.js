// Playground functionality
let editor;

// Initialize CodeMirror editor
document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.getElementById("codeEditor");
  editor = CodeMirror.fromTextArea(textarea, {
    mode: "javascript",
    theme: "default",
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
  });

  // Set default example
  loadExample1();

  // Add event listeners
  document.getElementById("example1").addEventListener("click", loadExample1);
  document.getElementById("example2").addEventListener("click", loadExample2);
  document.getElementById("example3").addEventListener("click", loadExample3);
  document.getElementById("lintButton").addEventListener("click", lintCode);
});

// Example code snippets
function loadExample1() {
  const code = `@Controller('users')
export class UsersController {
    @Get(':id')
    getUser(@Param('id') id: string) {
        return \`User \${id}\`;
    }

    @Get('me')
    getMe() {
        return 'Current user';
    }

    @Get('profile')
    getProfile() {
        return 'User profile';
    }
}`;
  editor.setValue(code);
}

function loadExample2() {
  const code = `@Controller('posts')
export class PostsController {
    @Get('featured')
    getFeaturedPosts() {
        return 'Featured posts';
    }

    @Get('featured')
    getTopPosts() {
        return 'Top posts';
    }

    @Post('create')
    createPost() {
        return 'Post created';
    }
}`;
  editor.setValue(code);
}

function loadExample3() {
  const code = `@Controller('products')
export class ProductsController {
    @Get('categories')
    getCategories() {
        return 'Product categories';
    }

    @Get('featured')
    getFeaturedProducts() {
        return 'Featured products';
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return \`Product \${id}\`;
    }

    @Post()
    createProduct() {
        return 'Product created';
    }
}`;
  editor.setValue(code);
}

// Lint code function
function lintCode() {
  const code = editor.getValue();
  const locale = document.getElementById("localeSelect").value;
  const results = analyzeCode(code, locale);
  displayResults(results);
}

// Analyze code for ESLint violations
function analyzeCode(code, locale) {
  const results = [];

  // Simple pattern matching for route analysis
  const routeRegex =
    /@(Get|Post|Put|Delete|Patch|All|Options|Head)\s*\(\s*['"`]([^'"`]*?)['"`]\s*\)/g;
  const routes = [];
  let match;
  let lineNumber = 1;

  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const routeMatch = line.match(routeRegex);

    if (routeMatch) {
      routeMatch.forEach((fullMatch) => {
        const methodMatch = fullMatch.match(
          /@(Get|Post|Put|Delete|Patch|All|Options|Head)\s*\(\s*['"`]([^'"`]*?)['"`]\s*\)/
        );
        if (methodMatch) {
          const method = methodMatch[1].toUpperCase();
          const path = methodMatch[2];
          routes.push({
            method,
            path,
            line: i + 1,
            fullMatch,
          });
        }
      });
    }
  }

  // Check for duplicates
  const duplicates = findDuplicates(routes);
  duplicates.forEach((dup) => {
    const message =
      locale === "ko"
        ? `중복된 라우트 ${dup.method}('${dup.path}')가 발견되었습니다. 컨트롤러 내에서 각 라우트는 고유해야 합니다.`
        : `Duplicate route ${dup.method}('${dup.path}') found. Each route should be unique within a controller.`;

    results.push({
      line: dup.line,
      column: 1,
      severity: "error",
      message: message,
      rule: "nestjs-route/no-duplicates",
    });
  });

  // Check route order
  const orderViolations = findOrderViolations(routes);
  orderViolations.forEach((violation) => {
    const message =
      locale === "ko"
        ? `고정 라우트('${violation.staticPath}')는 파라미터 라우트('${violation.paramPath}')보다 위에 위치해야 합니다.`
        : `Static route ('${violation.staticPath}') should be placed before parameter route ('${violation.paramPath}').`;

    results.push({
      line: violation.line,
      column: 1,
      severity: "error",
      message: message,
      rule: "nestjs-route/order",
    });
  });

  return results;
}

function findDuplicates(routes) {
  const seen = new Map();
  const duplicates = [];

  routes.forEach((route) => {
    const key = `${route.method}:${route.path}`;
    if (seen.has(key)) {
      duplicates.push(route);
    } else {
      seen.set(key, route);
    }
  });

  return duplicates;
}

function findOrderViolations(routes) {
  const violations = [];
  const sameMethodGroups = groupByMethod(routes);

  Object.values(sameMethodGroups).forEach((group) => {
    for (let i = 0; i < group.length - 1; i++) {
      const current = group[i];
      const next = group[i + 1];

      // Check if a parameterized route comes before a static route
      if (isParameterized(current.path) && !isParameterized(next.path)) {
        violations.push({
          line: next.line,
          staticPath: next.path,
          paramPath: current.path,
        });
      }
    }
  });

  return violations;
}

function groupByMethod(routes) {
  const groups = {};
  routes.forEach((route) => {
    if (!groups[route.method]) {
      groups[route.method] = [];
    }
    groups[route.method].push(route);
  });
  return groups;
}

function isParameterized(path) {
  return path.includes(":") || path.includes("*");
}

function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  const resultsContent = document.getElementById("resultsContent");

  if (results.length === 0) {
    resultsContent.innerHTML = `
            <div class="flex items-center space-x-2 text-green-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="font-medium">${
                  document.getElementById("localeSelect").value === "ko"
                    ? "문제없음!"
                    : "No issues found!"
                }</span>
            </div>
            <p class="text-gray-600 mt-2">${
              document.getElementById("localeSelect").value === "ko"
                ? "코드가 모든 ESLint 규칙을 통과했습니다."
                : "Your code passes all ESLint rules."
            }</p>
        `;
  } else {
    let html = `<div class="space-y-3">`;
    results.forEach((result) => {
      const severityColor = result.severity === "error" ? "red" : "yellow";
      const severityIcon =
        result.severity === "error"
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"/>';

      html += `
                <div class="flex items-start space-x-3 p-3 bg-${severityColor}-50 border border-${severityColor}-200 rounded-lg">
                    <svg class="w-5 h-5 text-${severityColor}-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${severityIcon}
                    </svg>
                    <div class="flex-1">
                        <div class="flex items-center space-x-2">
                            <span class="text-sm font-medium text-${severityColor}-800">Line ${result.line}</span>
                            <span class="text-xs text-${severityColor}-600 bg-${severityColor}-100 px-2 py-1 rounded">${result.rule}</span>
                        </div>
                        <p class="text-sm text-${severityColor}-700 mt-1">${result.message}</p>
                    </div>
                </div>
            `;
    });
    html += `</div>`;
    resultsContent.innerHTML = html;
  }

  resultsDiv.classList.remove("hidden");
}
