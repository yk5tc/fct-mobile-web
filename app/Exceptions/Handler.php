<?php

namespace App\Exceptions;

use App\ProductCategory;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if (is_mobile()) {
            if (strpos(env('APP_URL'), $request->server('HTTP_HOST')) === false) {
                header('location:' . env('APP_URL') . request()->server('REQUEST_URI'));
                exit();
            }
        } else {
            if (strpos(env('APP_PC_URL'), $request->server('HTTP_HOST')) === false) {
                header('location:' . env('APP_PC_URL') . request()->server('REQUEST_URI'));
                exit();
            }
        }

        $shareAvatar = fct_cdn('/img/mobile/nologin-head.png');
        view()->share('shareAvatar', $shareAvatar);
        view()->share('categories', ProductCategory::getCategories());

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect(url('login', [], env('APP_SECURE')));
    }
}
